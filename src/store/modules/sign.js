const state = {
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
  submitSignUp() {
    console.log(this.$store.state.url_users);     
    this.$http.post(this.$store.state.url_users, {
      email:     this.email,
      nickname:  this.nickname,
      password1: this.password,
      password2: this.password
    })    
    .then(response => {            
      console.log(response)
      window.alert('회원가입이 완료되었습니다');
    })
    .catch(error => {
      let error_data = error.response.data;
      let props      = Object.keys(error_data);
      console.log(props);
      for (let i = 0, length = props.length; i < length; i++) {
        console.log(props[i] + ' : ' + error_data[props[i]][0]);
        window.alert(props[i] + ' : ' + error_data[props[i]][0]);
        break;
      }
      
      console.log(error_data)
      console.log(error.response);
    });
    this.email    = '', 
    this.nickname = '', 
    this.password = '';
  }
}

export default {
  state,
  getters,
  mutations
}