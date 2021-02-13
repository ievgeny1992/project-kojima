import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VuePlyr from 'vue-plyr'
import "./assets/scss/main.scss";

Vue.config.productionTip = false

const moment = require('moment')
require('moment/locale/ru')

Vue.use(require('vue-moment'), {
    moment
})

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
