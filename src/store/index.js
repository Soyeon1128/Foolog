import Vue from 'vue'
import Vuex from 'vuex'
import sign from './modules/sign'
import post from './modules/post'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules:{
    sign,
    post
  },

  state: {
    // url: 'http://foolog.jos-project.xyz',
    url_users: 'http://api.foolog.xyz/member/',
    url_login: 'http://api.foolog.xyz/member/login/',
    url_valid: 'http://api.foolog.xyz/member/valid/',
    url_daylist: 'http://api.foolog.xyz/post/day/',
  },

  getters: {
    getUrlLogin(state){
      return state.url_login;
    }
  },

  mutations: {
    goToHome() {
      this.$router.push( {path: '/'} )
    }
  }
})