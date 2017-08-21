const state = {
  user_pk: '',
  sign_up: false,
  sign_in: false,
  main_view: true
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
  }
}

const mutations = {
//-------------------------------- Validation SignIn





//-------------------------------- Validation SignUp


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