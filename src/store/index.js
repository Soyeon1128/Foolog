import Vue from 'vue'
import Vuex from 'vuex'
import sign from './modules/sign'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules:{
    sign
  },

  state: {
    // url: 'http://foolog.jos-project.xyz',
    url_users: 'http://foolog.jos-project.xyz/api/member/',
    url_login: 'http://foolog.jos-project.xyz/api/member/login/',

  },

  getters: {
    getUrlLogin(state){
      return state.url_login;
    }
  },

  mutations: {

  }
})