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
    sign_up: false,
    sign_in: false,
    main_view: true
  },
  getters: {
    signUp(state) {
      return state.sign_up;
    },
    signIn(state) {
      return state.sign_in;
    },
    mainView(state) {
      return state.main_view;
    }
  },
  mutations: {
    openSignUp(state) {
      if ( state.sign_up === false ) {
        state.sign_up = true;
        state.sign_in = false;
        state.main_view = false;
      }
    },
    openSignIn(state) {
      if ( state.sign_in === false ) {
        state.sign_in = true;
        state.sign_up = false;
        state.main_view = false;
      }
    },
    closeSignIn(state) {
      if ( state.sign_in === true ) {
        state.sign_in = false;
        state.main_view = true;
      }
    },
    closeSignUp(state) {
      if ( state.sign_up === true ) {
        state.sign_up = false;
        state.main_view = true;
      }
    }
  }
})