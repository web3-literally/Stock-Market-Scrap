const ObjectId = require('mongodb').ObjectID;
const {schedule} = require('node-cron');
const axios = require("axios")

class ScrapController {
    constructor(db) {
        this.db = db;
        this.init();

        schedule('0 1 * * *', async () => {
            await this.GetTags()
        }).start()
        schedule('0 6 * * *', async () => {
            await this.GetCompaniesTimeSeries()
        }).start()
        schedule('0 12 * * *', async () => {
            await this.CalculateData()
        }).start()
    }

    async init() {
        //await this.GetCompaniesTimeSeries()
        await this.CalculateData()
        //await this.GetTags()
    }

    async ReadCompanies({str_query='',skip=0,limit=10}) {
        let regex=""
        regex=".*"+str_query+".*"
        console.log("regex",regex,str_query,skip,limit)

        let companies=await this.db.collection('companies').find({
            "name" : {$regex : regex}
        }).toArray()
        let result = await this.db.collection('companies').aggregate([
            /*{
                $lookup: {
                    from: "tags",
                    localField: "tag_key",
                    foreignField: "_id",
                    as: "tag"
                }
            },
            {
                $unwind: "$tag"
            },*/
            {
                $match: {
                    "name" : {$regex : regex}
                }
            },
            {
                $skip: skip,
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: "analysis_result",
                    let: {company_id: "$_id"},
                    pipeline: [
                        {

                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$company_id", "$$company_id"]
                                        }
                                    ]
                                },
                            }
                        },
                        {$sort: {"created_at": -1}},
                        {$limit: 1}
                    ],
                    as: "analysis_result"
                }
            },
            /*{
                $unwind: "$analysis_result"
            },*/
        ]).toArray()
        console.log('read companies', result.length)
        return {
            total_count:companies.length,
            result
        }
    }

    async GetAnalysis(data) {
        //console.log(data)
        data.days = parseInt(data.days)
        let company_detail = await this.db.collection('companies').findOne({_id: data.company_id})
        let series = await this.db.collection('series').aggregate([
            {
                $match: {company_id: data.company_id}
            },
            {
                $sort: {"dateTime": -1}
            },
            {$limit: data.days},
            {
                $sort: {"dateTime": 1}
            },
        ]).toArray()
        let rsp = 0
        let psp = 0
        let rsi = 0
        let tp = 0
        let sl = 0
        let bollinger_band = 0
        let drawdown = 0
        try {
            let current_price = series[series.length - 1].close
            let current_high = series[series.length - 1].high
            let current_low = series[series.length - 1].low
            rsp = (100 - (current_price - series[0].close) / series[0].close * 100).toFixed(2)
            psp = series[0].close
            let max_price = Math.max.apply(Math, series.map(function (o) {
                return o.close;
            }))
            let min_price = Math.min.apply(Math, series.map(function (o) {
                return o.close;
            }))
            let layer = (max_price - min_price) / 6
            let price_movement = current_price - (min_price + layer * 3)
            bollinger_band = price_movement / layer
            drawdown = (max_price - min_price) / series[0].close * 100

            // let high_avg=series.map(x=>x.high).reduce(function(a, b){return a+b;})
            // let low_avg=series.map(x=>x.low).reduce(function(a, b){return a+b;})
            // rsi=100-(100/(1+(high_avg-current_high)/(low_avg-current_low)))
            rsi = 100 + ((current_price - series[0].close) / series[0].close) * 100

            tp = max_price + (layer * 5.5)
            sl = max_price + (layer * 0.5)
            //console.log(max_price,min_price,high_avg,low_avg)

        } catch (e) {

        }
        return {
            company_detail,
            series,
            rsp: rsp,
            bollinger_band: bollinger_band.toFixed(2),
            drawdown: drawdown.toFixed(2),
            rsi: rsi.toFixed(2),
            tp: tp.toFixed(2),
            sl: sl.toFixed(2),
            psp: psp.toFixed(2),
            tp_sl: (tp / sl).toFixed(2)
        }
    }

    async GetAnalysisByDate(company_id) {
        let days = [1, 3, 7, 14, 28, 60, 90]
        let result = []
        let analysis_result = {}
        for (const day of days) {
            let temp = await this.GetAnalysis({company_id, days: day})
            temp.days = day
            result.push(temp)
            // delete temp.company_detail
            delete temp.series
            delete temp.company_detail
            analysis_result["day_" + day] = temp
        }
        try {
            //console.log(company_id)
            let series = await this.db.collection('series').aggregate([
                {
                    $match: {company_id: company_id}
                },
                {
                    $sort: {"dateTime": -1}
                },
                {$limit: 1},
                {
                    $sort: {"dateTime": -1}
                },
            ]).toArray()
            let updated_at = ""
            if (series.length > 0) {
                updated_at = series[0].dateTime_str
            }
            console.log('updated_at', updated_at)
            /*this.db.collection("companies").updateOne({_id: company_id}, {
                $set: {
                    // analysis_result: analysis_result,
                    updated_at
                }
            })*/
            this.db.collection("analysis_result").updateOne({_id: company_id + '_' + updated_at}, {
                $set: {
                    analysis_result: analysis_result,
                    updated_at,
                    current_stock: series[0],
                    created_at: new Date().toISOString(),
                    company_id
                }
            }, {upsert: true})

        } catch (e) {
            console.log("wrong update", company_id, e)
        }
        return result
    }

    async CalculateData() {
        let companies = await this.db.collection('companies').find().toArray()
        console.log("CalculateData")
        for (const company of companies) {
            await this.GetAnalysisByDate(company._id).catch(e => {
                console.log("calculate error", e)
            })
        }
        return 0
    }

    async GetCompaniesTimeSeries() {
        let companies = await this.db.collection('companies').find().toArray();
        console.log("GetCompaniesTimeSeries scrapping", companies.length)
        for (const company of companies) {
            //console.log(url)
            try {
                let url = `https://api.shikiho.jp/timeseries/v1/timeseries/1/${company._id}?term=36m&addtionalFields=volume%2CsellMargin%2CbuyMargin&format=epocmilli&market=prime&cycle=d`
                let result = await axios.get(url,
                    {headers: {"authorization": "clie5aezWyjER92iNgJb0XPMXnDvBpp1Ad5W"}}).catch(e => {
                    console.log("Series scrapping error", company._id)
                })
                let series = result.data.series
                for (const item of series) {
                    item._id = company._id + "_" + item.dateTime_str
                    item.company_id = company._id
                    this.db.collection("series").updateOne({_id: item._id}, {$set: item}, {upsert: true})
                }
                //this.db.collection("stock_price").updateOne({_id: company._id}, {$set: {stock_price:
                // series[series.length - 1].close}})
                //console.log(series.length)
            } catch (e) {
                //console.log("scraping error")
            }
        }

        return 0
    }

    async GetTags() {
        console.log("tags scraping")
        try {
            let url = "https://api.shikiho.jp/screening/v1/headwords/count";
            let tags = await axios.get(url, {headers: {"authorization": "709e14b2b9fdba0e93c5171bc7dcdbd5"}})
            let tag_data = tags.data.headwords
            for (var key in tag_data) {
                //console.log(tag_data[key]);
                let temp = tag_data[key]
                temp._id = key
                this.db.collection("tags").updateOne({_id: temp._id}, {$set: temp}, {upsert: true})
                await this.GetCompaniesByTag(key)
            }
        } catch (e) {
            console.log("tags scrap error")
        }

    }

    async GetCompaniesByTag(tag_key) {
        try {
            let url = `https://api.shikiho.jp/screening/v1/headwords?headword=${tag_key}`
            let api_result = await axios.get(url, {headers: {"authorization": "709e14b2b9fdba0e93c5171bc7dcdbd5"}})
            let result = await api_result.data.result
            //console.log(result)
            result.forEach(item => {
                //console.log(item)
                this.db.collection('company_tag').updateOne({
                    tag_key: tag_key,
                    company_id: item.stockCode
                }, {$set: {updated_at: new Date().toISOString()}}, {upsert: true})
            })
        } catch (e) {

        }
    }

}

module.exports = ScrapController
