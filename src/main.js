<<<<<<< HEAD
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
=======
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
>>>>>>> 175d4304f500e7ffe94bc5c8775705735a0c714c
