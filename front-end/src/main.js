import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import TIcon from './components/TIcon'
Vue.component('TIcon', TIcon)

window.axios = require('axios')
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
window.axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
