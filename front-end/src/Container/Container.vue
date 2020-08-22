<template>
  <div id="keep" >
    <v-app-bar
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span v-if="!drawer" class="title ml-3 mr-5 text-no-wrap">{{$store.state.settings.text_logo}}</span>
      <v-text-field
        solo
        dense
        flat
        single-line
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>

      <v-spacer></v-spacer>
      <!--<div style="cursor: pointer;margin-right: 10px">
        <v-badge offset-x="10" offset-y="10" color="red" content="3">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </div>
      <div style="cursor: pointer; display: flex;flex-wrap: nowrap">
        &lt;!&ndash;<v-avatar
          size="32px"
          item
          :rounded="'rounded-xl'"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="Vuetify"
          ></v-img>
        </v-avatar>&ndash;&gt;
          <span>
            john
          </span>
      </div>-->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app

      color="#122e85"
      dark
      :mobile-breakpoint="800"
    >
      <v-list
        dense
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="12">
              <h1 style="text-align: center" v-if="item.heading">{{ item.heading }}</h1>
            </v-col>

          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>
          <v-list-item
            v-else
            :key="i"
            link
            :to="item.link"
          >
            <v-list-item-action class="mx-0 mr-3">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title >
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main >
      <v-container
        fluid
      >
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      /* { icon: 'lightbulb_outline', text: 'Notes' },
        { icon: 'touch_app', text: 'Reminders' },
        { divider: true }, */
      { heading: 'Stock Analysis' },
      /* { icon: 'add', text: 'Create new label' },
        { divider: true }, */
      // { icon: 'dashboard', text: 'Dashboard', link: '/' },
      { icon: 'business', text: 'Companies', link: '/companies' },
      { icon: 'fas fa-chart-bar', text: 'Stock Analysis', link: '/current-stock-price' },
      /* { icon: 'fas fa-chart-bar', text: 'Past Stock Price', link: 'past-stock-price' },
      { icon: 'fas fa-chart-bar', text: 'Relative Stock Price', link: 'relative-stock-price' },
      { icon: 'fas fa-chart-bar', text: 'Bollinger Band', link: 'bollinger-band' },
      { icon: 'fas fa-chart-bar', text: 'Drawdown', link: 'drawdown' },
      { icon: 'fas fa-chart-bar', text: 'RSI', link: 'rsi' },
      { icon: 'fas fa-chart-bar', text: 'TP/SL', link: 'tp-sl' }, */
      // { icon: 'account_circle', text: 'Profile', link: 'profile' },
      { icon: 'fas fa-lock', text: 'Change Password', link: '/change-password' },
      // { icon: 'fas fa-question-circle', text: 'Help', link: '/help' },
      { icon: 'fas fa-sign-out-alt', text: 'Logout', link: '/logout' }

    ]
  }),
  created () {
    if (localStorage.getItem('uid') == null || localStorage.getItem('apiToken') == null) {
      this.$router.push('/login')
      return 0
    }
    if (localStorage.uid === undefined || localStorage.apiToken === undefined) {
      this.$router.replace('/login')
      console.log('localStorage.uid', localStorage.uid)
      return 0
    }
    window.axios.post('/CheckLogin', { uid: localStorage.uid, apiToken: localStorage.apiToken }).then(({ data }) => {
      if (data.state < 0) {
        this.$router.replace('/login')
      } else {
        this.$store.state.userData = data.result
      }
    })
  }
}
</script>

<style>
  #keep .v-navigation-drawer__border {
    display: none
  }
</style>
