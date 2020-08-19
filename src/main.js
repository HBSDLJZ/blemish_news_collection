import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import tagCloud from 'v-tag-cloud'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.use(tagCloud)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
