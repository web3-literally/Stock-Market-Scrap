<style scoped lang="scss">
  .sat-detail{
    display: flex;
    justify-content: space-between;
  }
</style>
<template>
    <div>
      <h2 class="py-2 mx-4">Stock Analysis</h2>
      <v-card elevation="1" height="100%" class="mr-4 my-2" :loading="isload">
        <v-card-title>
          <h5>Filter</h5>
          <v-spacer/>
        </v-card-title>
        <v-card-text style="overflow-y: auto;height: calc(100% - 130px)">
          <form @submit.prevent="submit()">
            <div class="mt-2" style="display: flex;justify-content: space-between">
              <div>
                <v-text-field label="Company ID" v-model="filter.company_id" outlined dense hide-details required/>
              </div>
              <div>
                <v-text-field label="Days" v-model="filter.days" outlined dense type="number" hide-details required/>
              </div>
              <v-btn color="primary" dark width="150px" type="submit">Analysis</v-btn>
            </div>
          </form>
        </v-card-text>
      </v-card>

      <v-card elevation="1" height="100%" class="mr-4 my-2" v-if="analysis_data.company_detail" >
        <v-card-title>
          <h5>Analysis Result</h5>
          <v-spacer/>
        </v-card-title>
        <v-card-text style="overflow-y: auto;height: calc(100% - 130px)">
          <div>
            <!--<h5 class="px-2">Company Detail</h5>-->
            <div style="display: flex;justify-content: center;flex-wrap: wrap">
              <div class="px-2 my-2"
                   >
                <div
                  style="border: solid 1px gray;
                  padding: 10px;
                  border-radius: 10px;
                  font-size: 16px;
                  line-height: 1.5;
                  width: fit-content;"
                >
                  <div class="sat-detail">
                    <div>Name:</div>
                    <strong>{{analysis_data.company_detail.name}}</strong>
                  </div>
                  <div class="sat-detail">Market:<strong>{{analysis_data.company_detail.market}}</strong></div>
                  <div class="sat-detail">Big Category:<strong>{{analysis_data.company_detail.big_category}}</strong></div>
                  <div class="sat-detail">Small Category:<strong>{{analysis_data.company_detail.small_category}}</strong></div>
                  <div class="sat-detail">Stock Price:<strong>{{analysis_data.company_detail.stock_price}}</strong></div>
                  <div class="sat-detail">Relative Stock Price:<strong>{{analysis_data.rsp}}</strong></div>
                  <div class="sat-detail">Bollinger Band:<strong>{{analysis_data.bollinger_band}}</strong></div>
                  <div class="sat-detail">Drawdown:<strong>{{analysis_data.drawdown}} %</strong></div>
                  <div class="sat-detail">RSI:<strong>{{analysis_data.rsi}}</strong></div>
                  <div class="sat-detail">TP:<strong>{{analysis_data.tp}}</strong></div>
                  <div class="sat-detail">SL:<strong>{{analysis_data.sl}}</strong></div>
                </div>

              </div>
              <div style="flex: 1;" class="my-2 px-2">
                <v-card
                  class="mx-auto text-center"
                  color="green"
                  dark
                  min-width="300px"
                >
                  <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                      <v-sparkline
                        :value="analysis_data.series.map(x=>x.close)"
                        :labels="analysis_data.series.map(x=>x.dateTime_str)"
                        :line-width="1"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                        auto-draw
                        :key="JSON.stringify(analysis_data.series)"
                      >
                        <template v-slot:label="item">
                          <!--<div v-if="analysis_data.series.length<10">
                            {{ new Date(item.value).getDate() }}
                          </div>
                          <div v-else-if="item.index%(parseInt(analysis_data.series.length/10))==0">
                            {{ new Date(item.value).getDate() }}
                          </div>
                          <div v-else>
                            {{item.index}}
                          </div>-->
                          {{getLabel(item)}}
                        </template>
                      </v-sparkline>
                    </v-sheet>
                  </v-card-text>

                  <v-card-text>
                    <div class="display-1 font-weight-thin">Stock Price Last {{analysis_data.series.length}}days</div>
                  </v-card-text>

                  <v-divider></v-divider>
                </v-card>
              </div>
            </div>
          </div>

        </v-card-text>
      </v-card>
      <v-card elevation="1" height="100%" class="mr-4 my-2" :loading="company_load">
        <v-card-title>
          <h5>Analysis by days</h5>
          <v-spacer/>
        </v-card-title>
        <v-card-text style="overflow-y: auto;height: calc(100% - 130px)">
          <v-data-table
            :headers="companyTable.headers"
            :items="companyTable.desserts"
            item-key="days"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
export default {
  name: 'CurrentStockPrice',
  data () {
    return {
      filter: { company_id: '', days: 7 },
      analysis_data: {},
      isload: false,
      company_load: false,
      companyTable: {
        desserts: [],
        headers: [
          {
            text: 'Days',
            align: 'start',
            sortable: false,
            width: '20px',
            value: 'days'
          },
          { text: 'Past Stock Price', value: 'psp', width: '150px' },
          { text: 'Relative Stock Price', value: 'rsp', width: '170px' },
          { text: 'Bollinger Band', value: 'bollinger_band', width: '150px' },
          { text: 'Drowdown', value: 'drawdown', width: '150px' },
          { text: 'RSI', value: 'rsi', width: '80px' },
          { text: 'TP', value: 'tp', width: '80px' },
          { text: 'SL', value: 'sl', width: '80px' }
        ]
      }
    }
  },
  created () {
    console.log(this.$route.params.company_id)
    if (this.$route.params.company_id) {
      this.filter.company_id = this.$route.params.company_id
      this.getAnalysis()
      this.getAnalysisByDate()
    }
  },
  methods: {
    submit () {
      this.getAnalysis()
      this.getAnalysisByDate()
    },
    getAnalysisByDate () {
      this.company_load = true
      window.axios.post('/companies/GetAnalysisByDate', this.filter).then(({ data }) => {
        this.company_load = false
        this.companyTable.desserts = data
      })
    },
    getLabel (item) {
      if (this.analysis_data.series.length <= 7) {
        return new Date(item.value).getDate() + '/' + (new Date(item.value).getMonth() + 1)
      } else if (item.index % (parseInt(this.analysis_data.series.length / 7)) == 0) {
        return new Date(item.value).getDate() + '/' + (new Date(item.value).getMonth() + 1)
      }
      return ''
    },
    getAnalysis () {
      this.isload = true
      window.axios.post('/companies/getAnalysis', this.filter).then(({ data }) => {
        this.isload = false
        console.log(data)
        this.analysis_data = data
      })
    }
  }
}
</script>

<style scoped>

</style>
