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
    url_users: 'http://api.foolog.xyz/member/',
    url_login: 'http://api.foolog.xyz/member/login/',
    url_valid: 'http://api.foolog.xyz/member/valid/'

  },

  getters: {
    getUrlLogin(state){
      return state.url_login;
    }
  },

  mutations: {
    goToHmoe() {
      this.$router.push( {path: '/'} )
    }
  }
})