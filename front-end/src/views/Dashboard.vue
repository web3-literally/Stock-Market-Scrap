<style lang="scss" scoped>
  .d-content-item{
    display: flex;justify-content: space-around;flex-wrap: wrap;
    height:calc(100vh - 150px);
    position: relative;
  }

</style>
<template>
  <div>
    <h2 class="py-1 mx-4">Dashboard</h2>
    <div transition="slide-x-transition">
      <div v-show="form_state==0" class="d-content-item">
        <v-card elevation="1" width="350px" height="100%" class="mr-4 rounded-xl my-2">
          <v-card-title>
            <h5>Pickup Now!</h5>
            <v-spacer/>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <t-icon name="more_horiz-black-18dp"/>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in 3"
                  :key="i"
                  @click=""
                >
                  <v-list-item-title>item {{ i }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text style="overflow-y: auto;height: calc(100% - 130px)">
            <div class="mt-2">
              <v-text-field v-model="picup.pickup_location" label="Enter Pickup Location" outlined dense/>
              <v-text-field v-model="picup.drop_location" label="Enter Drop Location" outlined dense/>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="picup.weight" label="Weight" type="number" outlined dense/>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="picup.dimension" label="Dimension" type="number" outlined dense/>
                </v-col>
              </v-row>
              <v-text-field v-model="picup.services" label="Services" outlined dense/>
              <v-text-field v-model="picup.transport_type" label="Transport Type Use" outlined dense/>
              <div style="display: flex;justify-content: space-between;width: 100%">
                <v-btn color="primary" outlined width="150px" @click="form_state=1">Schedule Book</v-btn>
                <v-btn color="primary" dark width="150px" @click="form_state=1">Book Now</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <div style="flex: 1;min-width: 300px;height:100%">
          <iframe
            class="my-2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d947400.6539815968!2d77.78273377811493!3d10.66922919687593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21896deb12fba5b9!2sOne%20way%20taxi%20Service%20in%20Vapi%2C%20All%20India%20Tour%20and%20taxi!5e0!3m2!1sen!2skr!4v1597424481546!5m2!1sen!2skr"
            frameborder="0" style="border-radius:20px;border: 0;width: 100%;height:100%" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
      </div>
      <div v-show="form_state==1" class="d-content-item">
        <v-card elevation="1" width="350px"  height="100%" class="mr-4 rounded-xl my-2">
          <v-card-title>
            <h5>Select Transportation</h5>
            <v-spacer/>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <t-icon name="more_horiz-black-18dp"/>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in 3"
                  :key="i"
                  @click=""
                >
                  <v-list-item-title>item {{ i }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text style="overflow-y: auto;height: calc(100% - 130px)">
            <v-card v-for="item in 10" class="my-2">
              <v-card-title>
                <v-checkbox label="Paya Transport" dense hide-details class="py-0 my-0"></v-checkbox>
                <v-spacer/>
                <div>
                  $2.00/per Km
                </div>
              </v-card-title>
              <v-card-text >
                <div class="grey lighten-4 rounded-lg pa-3" style="line-height: 2">
                  <div style="display: flex">
                    <div>Total Distance:</div>
                    <v-spacer/>
                    <div>27Km</div>
                  </div>
                  <div style="display: flex;font-weight: bold">
                    <div>Total Price:</div>
                    <v-spacer/>
                    <div>$52</div>
                  </div>
                  <div style="display: flex">
                    <div>car:</div>
                    <v-spacer/>
                    <div style="text-align: right">
                      <div>
                        Toyota Rav4(Model 2017)
                      </div>
                      <v-img
                        src="https://lh3.googleusercontent.com/proxy/Yu0GI9_Rfo2z_YO6jaihth5gkLcJbWCfUTh5MgOSbSTDkabcA5FSQLDcR28wJUC38tFbKj6auVE9uw1K4bdEKO-CSIyQ9iHQ3lYRPQaomWj-vrFvNoq497smwTs_Lmh2AbQ0fWZFrHX4hovTMg"
                        :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                        height="60px"
                        width="100"
                        contain
                        class="grey lighten-2 mr-0 rounded-lg"
                        style="margin-left: auto"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>

                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-actions >
            <v-btn color="primary" dark width="100%" class="mt-1"
                   @click="form_state=2"
            >Confirm</v-btn>
          </v-card-actions>
        </v-card>
        <div style="flex: 1;min-width: 300px;height:100%">
          <iframe
            class="my-2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d947400.6539815968!2d77.78273377811493!3d10.66922919687593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21896deb12fba5b9!2sOne%20way%20taxi%20Service%20in%20Vapi%2C%20All%20India%20Tour%20and%20taxi!5e0!3m2!1sen!2skr!4v1597424481546!5m2!1sen!2skr"
            frameborder="0" style="border-radius:20px;border: 0;width: 100%;height:100%" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
      </div>
      <div v-show="form_state==2" class="d-content-item">
        <v-card elevation="1" width="350px" height="100%" class="mr-4 rounded-xl my-2">
          <v-card-title>
            <h5>Scheduling Options</h5>
            <v-spacer/>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <t-icon name="more_horiz-black-18dp"/>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in 3"
                  :key="i"
                  @click=""
                >
                  <v-list-item-title>item {{ i }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text style="overflow-y: auto;height: calc(100% - 130px)">
            <div class="mt-2">
              <v-menu
                v-model="date_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="schedule_options.date"
                    label="Date"
                    prepend-inner-icon="event"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="schedule_options.date" @input="date_menu = false"></v-date-picker>
              </v-menu>
              <v-menu
                ref="menu"
                v-model="time_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="schedule_options.time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="schedule_options.time"
                    label="Pickup Time"
                    prepend-inner-icon="access_time"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="time_menu"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
              <div style="display: flex;justify-content: space-between">
                <v-btn color="primary" width="100%" @click="form_state=3">Confirm</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <div style="flex: 1;min-width: 300px;height:100%">
          <iframe
            class="my-2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d947400.6539815968!2d77.78273377811493!3d10.66922919687593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21896deb12fba5b9!2sOne%20way%20taxi%20Service%20in%20Vapi%2C%20All%20India%20Tour%20and%20taxi!5e0!3m2!1sen!2skr!4v1597424481546!5m2!1sen!2skr"
            frameborder="0" style="border-radius:20px;border: 0;width: 100%;height:100%" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
      </div>
      <div v-show="form_state==3" class="d-content-item">
        <v-card elevation="1" width="350px" height="100%" class="mr-4 rounded-xl my-2">
          <v-card-title>
            <h5>Request Status</h5>
            <v-spacer/>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <t-icon name="more_horiz-black-18dp"/>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in 3"
                  :key="i"
                  @click=""
                >
                  <v-list-item-title>item {{ i }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text style="overflow-y: auto;height: calc(100% - 130px)">
            <div class="mt-2 line-height-40">
              <div>Status:</div>
              <div style="color: #1976d2">Waiting for confirmation ...</div>
              <div style="display: flex;">
                <div>Request ID:</div>
                <v-spacer/>
                <div style="font-weight: bold">152456845863514</div>
              </div>
              <div style="display: flex">
                <div>Time:</div>
                <v-spacer/>
                <div style="font-weight: bold">{{new Date().toLocaleDateString()}}, {{new Date().toLocaleTimeString()}}</div>
              </div>
              <div class="grey lighten-4 rounded-lg pa-3" style="line-height: 2">

                <div style="display: flex;">
                  <div>From:</div>
                  <v-spacer/>
                  <div style="font-weight: bold">London, UK</div>
                </div>
                <div style="display: flex;">
                  <div>To:</div>
                  <v-spacer/>
                  <div style="font-weight: bold">Liverpool, UK</div>
                </div>
                <div style="display: flex">
                  <div>car:</div>
                  <v-spacer/>
                  <div style="text-align: right">
                    <div>
                      Toyota Rav4(Model 2017)
                    </div>
                    <v-img
                      src="https://lh3.googleusercontent.com/proxy/Yu0GI9_Rfo2z_YO6jaihth5gkLcJbWCfUTh5MgOSbSTDkabcA5FSQLDcR28wJUC38tFbKj6auVE9uw1K4bdEKO-CSIyQ9iHQ3lYRPQaomWj-vrFvNoq497smwTs_Lmh2AbQ0fWZFrHX4hovTMg"
                      :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                      height="60px"
                      width="100"
                      contain
                      class="grey lighten-2 mr-0 rounded-lg"
                      style="margin-left: auto"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                  </div>
                </div>
              </div>
              <div style="display: flex;justify-content: space-between">
                <v-btn color="primary" outlined width="100%" class="my-2" @click="form_state=4">Cancel Request</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <div style="flex: 1;min-width: 300px;height:100%">
          <iframe
            class="my-2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d947400.6539815968!2d77.78273377811493!3d10.66922919687593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21896deb12fba5b9!2sOne%20way%20taxi%20Service%20in%20Vapi%2C%20All%20India%20Tour%20and%20taxi!5e0!3m2!1sen!2skr!4v1597424481546!5m2!1sen!2skr"
            frameborder="0" style="border-radius:20px;border: 0;width: 100%;height:100%" allowfullscreen="" aria-hidden="false" tabindex="0">

          </iframe>
        </div>
      </div>
      <div v-show="form_state==4" class="d-content-item">
        <v-card elevation="1" width="350px" height="100%" class="mr-4 rounded-xl my-2">
          <v-card-title>
            <h5>Pick Up Now!</h5>
            <v-spacer/>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <t-icon name="more_horiz-black-18dp"/>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in 3"
                  :key="i"
                  @click=""
                >
                  <v-list-item-title>item {{ i }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text style="overflow-y: auto;height: calc(100% - 130px)">
            <div class="mt-2 line-height-40">
              <div style="display: flex;">
                <div>Request ID:</div>
                <v-spacer/>
                <div style="font-weight: bold">152456845863514</div>
              </div>
              <div style="display: flex">
                <div>car:</div>
                <v-spacer/>
                <div style="text-align: right;font-weight: bold">
                  <div>
                    Toyota Rav4(Model 2017)
                  </div>
                  <v-img
                    src="https://lh3.googleusercontent.com/proxy/Yu0GI9_Rfo2z_YO6jaihth5gkLcJbWCfUTh5MgOSbSTDkabcA5FSQLDcR28wJUC38tFbKj6auVE9uw1K4bdEKO-CSIyQ9iHQ3lYRPQaomWj-vrFvNoq497smwTs_Lmh2AbQ0fWZFrHX4hovTMg"
                    :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                    height="60px"
                    width="100"
                    contain
                    class="grey lighten-2 mr-0 rounded-lg"
                    style="margin-left: auto"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>

                </div>
              </div>
              <div style="display: flex">
                <div>Total Distance:</div>
                <v-spacer/>
                <div style="font-weight: bold">123 Km</div>
              </div>
              <div style="display: flex">
                <div>ETA:</div>
                <v-spacer/>
                <div style="font-weight: bold">3h 14min</div>
              </div>
              <div style="display: flex">
                <div>Estimated Fare:</div>
                <v-spacer/>
                <div style="font-weight: bold">$1250.00</div>
              </div>
              <div style="display: flex">
                <div>VAT:</div>
                <v-spacer/>
                <div style="font-weight: bold">$62.50</div>
              </div>
              <div style="display: flex">
                <div>Total Price:</div>
                <v-spacer/>
                <div style="font-weight: bold">$1312.50</div>
              </div>
              <v-divider/>
              <v-checkbox label="User Wallet Balance" dense hide-details/>
              <div style="display: flex" class="my-4">
                <div>Available Wallet Balance:</div>
                <v-spacer/>
                <div style="font-weight: bold">$1312.50</div>
              </div>
              <v-combobox
                v-model="select"
                :items="['Cash','Coin']"
                label="Payment Methods"
                outlined
                dense
              ></v-combobox>
              <div style="display: flex;justify-content: space-between">
                <v-btn color="primary" width="100%" class="my-2" @click="form_state=0">Confirm</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <div style="flex: 1;min-width: 300px;height:100%">
          <iframe
            class="my-2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d947400.6539815968!2d77.78273377811493!3d10.66922919687593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21896deb12fba5b9!2sOne%20way%20taxi%20Service%20in%20Vapi%2C%20All%20India%20Tour%20and%20taxi!5e0!3m2!1sen!2skr!4v1597424481546!5m2!1sen!2skr"
            frameborder="0" style="border-radius:20px;border: 0;width: 100%;height:100%" allowfullscreen="" aria-hidden="false" tabindex="0">

          </iframe>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name:"Dashboard",
    data(){
      return{
        date_menu:false,
        time_menu:false,
        form_state:0,
        picup:{
          pickup_location:"",
          drop_location:"",
          weight:0,
          dimension:0,
          services:"",
          transport_type:""
        },
        schedule_options:{
          date:"",
          time:""
        },
        select:""
      }
    }
  }
</script>
