import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App';
import {routes} from './routes'
import {store} from './store'

Vue.use(VueRouter);
Vue.prototype.$http = axios;

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});