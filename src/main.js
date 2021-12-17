import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    vuexPopulation: []
  },
  mutations: {
    addToPopulation (state, payload) {
      state.vuexPopulation.push({x: payload.x, y: payload.y})
    },
    resetPopulation (state) {
      state.vuexPopulation = null
    },
    assignNewPopulation(state, payload) {
      state.vuexPopulation = payload
    },
    filterPopulation(state, payload) {
      state.vuexPopulation = state.vuexPopulation.filter(cell => cell.x != payload.x || cell.y !=payload.y)
    }
  }
})

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')




