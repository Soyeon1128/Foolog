import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import sign from './modules/sign'
import post from './modules/post'

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.prototype.$http = axios;

export const store = new Vuex.Store({
  modules:{
    sign,
    post
  },

  state: {
    url_users: 'http://api.foolog.xyz/member/',
    url_login: 'http://api.foolog.xyz/member/login/',
    url_valid: 'http://api.foolog.xyz/member/valid/',
    url_post: 'http://api.foolog.xyz/post/',
    url_daylist: 'http://api.foolog.xyz/post/day/',
  },

  getters: {
    getUrlMember(state){
      return state.url_users;
    },
    getUrlLogin(state){
      return state.url_login;
    },
    sideMenu(state) {
      return state.side_menu;
    }
  },

  mutations: {
    goToHome() {
      this.$router.push( {path: '/'} )
    },
  }
})