
const ObjectId = require('mongodb').ObjectID;

class CronController {
    constructor(db) {
        this.db = db;

    }
    async GetCompaniesTimeSeries() {
        let result = await this.db.collection('companies').find().toArray()
        return result
    }


}

module.exports = ScrapController
