<template>
  <div>
    <h2 class="py-2 mx-4">Companies</h2>
    <v-card  class="rounded-lg" :elevation="3">
      <v-data-table
        :headers="companyTable.headers"
        :items="companyTable.desserts"
        :search="companyTable.search"
        :expanded.sync="companyTable.expanded"
        :loading="companyTable.isload"
        item-key="_id"
      >
        <template v-slot:top>
          <div>
            <v-toolbar flat color="" >
              <!--<v-toolbar-title>Users</v-toolbar-title>-->
              <div>
                <v-text-field
                  v-model="companyTable.search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </div>
              <!--<v-spacer></v-spacer>
              <v-dialog v-model="companyTable.dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    @click="companyTable.dialog=true"
                  >New</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-divider style="margin: 0"/>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="companyTable.editedItem._id"
                                        label="Code"
                                        :readonly="companyTable.editedIndex>0"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="companyTable.editedItem.name"
                                        label="Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="companyTable.editedItem.market"
                                        label="Market"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="companyTable.editedItem.big_category"
                                        label="Big Category"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="companyTable.editedItem.small_category"
                                        label="Small Category"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="companyTable.editedItem.stock_price"
                                        label="Stock Price" type="number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary"  @click="close">Cancel</v-btn>
                    <v-btn color="success"  @click="save">Submit</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>-->
            </v-toolbar>
            <v-divider style="margin: 0"/>
          </div>
        </template>
        <template v-slot:item.updated_at="{ item }">
          <v-chip :color="getColor(item).color" dark>{{getColor(item).text}}</v-chip>
        </template>
        <template v-slot:item.action="{item}">
          <v-btn
            @click="$router.push('/current-stock-price/'+item._id)"
            fab
            small
            class="mx-1"
            color="green"
            dark
          >
            <v-icon
              small
              dark
            >fas fa-chart-line</v-icon>
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <CompanyAnalysis :company_id="item._id"/>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CompanyAnalysis from '../components/CompanyAnalysis'
export default {
  name: 'Companies',
  components: { CompanyAnalysis },
  data () {
    return {
      companyTable: {
        isload: false,
        editedIndex: -1,
        search: '',
        dialog: false,
        expanded: [],
        headers: [
          {
            text: 'Code',
            align: 'start',
            sortable: false,
            width: '60px',
            value: '_id'
          },
          { text: 'Name', value: 'name', width: '100px' },
          // { text: 'Tag', value: 'tag.name', width: '100px' },
          { text: 'Market', value: 'market', width: '100px' },
          { text: 'Big Category', value: 'big_category', width: '150px' },
          { text: 'Small Category', value: 'small_category', width: '180px' },
          // { text: 'Stock Price', value: 'stock_price', width: '150px' },

          { text: 'Updated At', value: 'updated_at', width: '150px' },

          { text: '1-RSP', value: 'analysis_result.0.analysis_result.day_1.rsp', width: '180px' },
          { text: '1-Bollinger-Band', value: 'analysis_result.0.analysis_result.day_1.bollinger_band', width: '180px' },
          { text: '1-TP/SL', value: 'analysis_result.0.analysis_result.day_1.tp_sl', width: '180px' },
          { text: '1-PastStockPrice', value: 'analysis_result.0.analysis_result.day_1.psp', width: '180px' },

          { text: '3-RSP', value: 'analysis_result.0.analysis_result.day_3.rsp', width: '180px' },
          { text: '3-Bollinger-Band', value: 'analysis_result.0.analysis_result.day_3.bollinger_band', width: '180px' },
          { text: '3-TP/SL', value: 'analysis_result.0.analysis_result.day_3.tp_sl', width: '180px' },
          { text: '3-PastStockPrice', value: 'analysis_result.0.analysis_result.day_3.psp', width: '180px' },

          { text: '7-RSP', value: 'analysis_result.0.analysis_result.day_7.rsp', width: '180px' },
          { text: '7-Bollinger-Band', value: 'analysis_result.0.analysis_result.day_7.bollinger_band', width: '180px' },
          { text: '7-TP/SL', value: 'analysis_result.0.analysis_result.day_7.tp_sl', width: '180px' },
          { text: '7-PastStockPrice', value: 'analysis_result.0.analysis_result.day_7.psp', width: '180px' },

          { text: '14-RSP', value: 'analysis_result.0.analysis_result.day_14.rsp', width: '180px' },
          { text: '14-Bollinger-Band', value: 'analysis_result.0.analysis_result.day_14.bollinger_band', width: '180px' },
          { text: '14-TP/SL', value: 'analysis_result.0.analysis_result.day_14.tp_sl', width: '180px' },
          { text: '14-PastStockPrice', value: 'analysis_result.0.analysis_result.day_14.psp', width: '180px' },

          { text: '28-RSP', value: 'analysis_result.0.analysis_result.day_28.rsp', width: '180px' },
          { text: '28-Bollinger-Band', value: 'analysis_result.0.analysis_result.day_28.bollinger_band', width: '180px' },
          { text: '28-TP/SL', value: 'analysis_result.0.analysis_result.day_28.tp_sl', width: '180px' },
          { text: '28-PastStockPrice', value: 'analysis_result.0.analysis_result.day_28.psp', width: '180px' },

          { text: '60-RSP', value: 'analysis_result.0.analysis_result.day_60.rsp', width: '180px' },
          { text: '60-Bollinger-Band', value: 'analysis_result.0.analysis_result.day_60.bollinger_band', width: '180px' },
          { text: '60-TP/SL', value: 'analysis_result.0.analysis_result.day_60.tp_sl', width: '180px' },
          { text: '60-PastStockPrice', value: 'analysis_result.0.analysis_result.day_60.psp', width: '180px' },

          { text: '90-RSP', value: 'analysis_result.0.analysis_result.day_90.rsp', width: '180px' },
          { text: '90-Bollinger-Band', value: 'analysis_result.0.analysis_result.day_90.bollinger_band', width: '180px' },
          { text: '90-TP/SL', value: 'analysis_result.0.analysis_result.day_90.tp_sl', width: '180px' },
          { text: '90-PastStockPrice', value: 'analysis_result.0.analysis_result.day_90.psp', width: '180px' },

          { text: 'Action', value: 'action', width: '70px', sortable: false }
          /* { text: '', value: 'data-table-expand', width: '70px', sortable: false } */
        ],
        desserts: [],
        editedItem: {
          name: '',
          market: '',
          big_category: '',
          small_category: '',
          stock_price: ''
        },
        defaultItem: {
          name: '',
          market: '',
          big_category: '',
          small_category: '',
          stock_price: ''
        }
      }
    }
  },
  computed: {
    formTitle () {
      return this.companyTable.editedIndex === -1 ? 'New Company' : 'Edit Company'
    }
  },
  created () {
    this.read()
  },
  methods: {
    getColor (item) {
      const result = {
        color: '#f00',
        text: 'Non-Updated'
      }
      if (item.analysis_result.length<1){
        return result
      }
      if (item.analysis_result[0].updated_at === undefined) {
        return result
      }
      try {
        const updated_at = item.analysis_result[0].updated_at
        const c_date = new Date().getDate()
        const u_data = new Date(updated_at).getDate()
        console.log(updated_at)
        if (updated_at === '') {
          return {
            color: '#f00',
            text: 'Non-Updated'
          }
        } else {
          if (c_date - 1 != u_data) {
            return {
              color: '#ee770f',
              text: updated_at
            }
          } else {
            return {
              color: '#50c127',
              text: updated_at
            }
          }
        }
      } catch (e) {
        console.log(item, e)
      }
      return result
    },
    read () {
      this.companyTable.isload = true
      window.axios.post('/companies/read').then(({ data }) => {
        this.companyTable.desserts = data
        this.companyTable.isload = false
      }).catch(e => {
        this.companyTable.isload = false
      })
    },
    save () {
      const senddata = this.companyTable.editedItem
      window.axios.post('/company/save', { account: senddata, uid: this.$store.state.userData.auth.uid }).then(({ data }) => {
        if (this.companyTable.editedIndex > -1) {
          const self = this
          Object.assign(self.companyTable.desserts[self.companyTable.editedIndex], data.result)
          this.close()
        } else {
          this.companyTable.desserts.unshift(data.data.ops[0])
          // this.companyTable.$store.state.accountList.unshift(data.result)
          this.close()
        }
        Object.assign(self.companyTable.desserts[self.companyTable.editedIndex], data.result)
        this.close()
      })
    },
    close () {
      this.companyTable.dialog = false
      this.$nextTick(() => {
        this.companyTable.editedItem = Object.assign({}, this.companyTable.defaultItem)
        this.companyTable.editedIndex = -1
      })
    }
  }
}
</script>

<style >
.t_item{
  height: 66px!important;
}
</style>
