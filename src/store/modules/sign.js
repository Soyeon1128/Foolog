let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
let passwordRegex = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

const state = {
  user_pk: '',
  sign_up: false,
  sign_in: false,
  main_view: true,
  email: '',
  email_valid_warning: '',
  email_valid_false: false,

}

const getters = {
  mainView(state) {
    return state.main_view;
  },
  signUp(state) {
    return state.sign_up;
  },
  signIn(state) {
    return state.sign_in;
  },
  userPk(state) {
    return state.user_pk;
  },
}

const mutations = {

//-------------------------------- SignIn
  openSignIn(state) {
    if ( state.sign_in === false ) {
      state.sign_in   = true;
      state.sign_up   = false;
      state.main_view = false;
    }
  },
  closeSignIn(state) {
    if ( state.sign_in === true ) {
      state.sign_in   = false;
      state.main_view = true;
    }
  },
  setUserPk(state, pk) {
    state.user_pk = pk;
  },
 
//-------------------------------- SignUp  
  openSignUp(state) {
    if ( state.sign_up === false ) {
      state.sign_up   = true;
      state.sign_in   = false;
      state.main_view = false;
    }
  },
  closeSignUp(state) {
    if ( state.sign_up === true ) {
      state.sign_up   = false;
      state.main_view = true;
    }
  },
}

export default {
  state,
  getters,
  mutations
}