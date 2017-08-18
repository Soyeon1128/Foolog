<template lang="pug">
  .signin-container.susy-user
    main.signin-content-wrapper
      .signin-content-wrapper-inside
        button.signin-content-wrapper-inside-delete(
          type='button'
          @click='closeSignIn') X
        .signin-content-buttons
          button.signin-content-buttons-signin(type='button') 로그인
          button.signin-content-buttons-signup(
            type='button'
            @click='openSignUp') 회원가입
        .signin-input
          form
            legend 로그인 및 회원가입 폼
            fieldset
              label(for='signin-email')
              input(
                v-model.trim='email'
                id='signin-email'
                type='email'
                @keydown.enter='submitSignIn'
                placeholder='이메일을 입력해 주세요.'
                aria-label='로그인 이메일'
                required
                autofocus
                )
              .warning-message(
                v-if='emailValidation',
                :classList="['fa.fa-exclamation-circle']"
                :message= 'emailValidationWarning'
              )
              label(for='signin-password')
              input(
                v-model.trim='password'
                id='signin-password' 
                type='password' 
                placeholder='비밀번호를 입력해 주세요.'
                aria-label='로그인 비밀번호'                
                @keydown.enter='submitSignIn'                  
                required
                )                  
          .signin-buttons-signin
            button.signin-login(
              type='button'
              @click='submitSignIn')
              span 로그인
            .fb-login-button(
              data-max-rows='1', 
              data-size='large', 
              data-button-type='login_with', 
              data-show-faces='false', 
              data-auto-logout-link='false', 
              data-use-continue-as='false')
          hr
          p.signin-notice-facebook Facebook아이디로 간편하게 로그인 할 수 있습니다.
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
let passwordRegex = /^[A-Za-z0-9]{8,20}$/;

export default {
  name: 'SignIn',
  data() {
    return{
      email: '',
      password: '',
      emailValidationWarning: '',
      passwordValidationWarning: '',
    }
  },
  computed: {
    ...mapGetters([
      'signUp',
      'signIn',
      'mainView',
      'getUrlLogin'
    ]),
    emailValidation() {
      if( !emailRegex.test(this.email) ) {
        this.emailValidationWarning = '잘못된 이메일 형식입니다.'
        return false
      } else {
        return true
      }
    },
    passwordValidation() {
      if ( !passwordRegex.text(this.password) ) {
        this.passwordValidationWarning = '비밀번호는 8자 이상, 영어와 숫자를 혼합해서 입력해 주세요.'
      }
    }
  },
  methods: {
    ...mapMutations([
      'openSignUp',
      'closeSignIn',
    ]),
    submitSignIn() {
      this.$http.post(this.getUrlLogin, {
        email:    this.email,
        password: this.password
      })
      .then(response => {
        let token = response.data.key;
        if ( !window.localStorage.getItem('token') ) {
          window.localStorage.setItem('token', token);
        }
        console.log('success token:', window.localStorage.getItem('token'));
        this.$router.push( {path: '/calendar'} );
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  
  body
    overlfow: hidden

</style>