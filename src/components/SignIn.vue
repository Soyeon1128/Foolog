<template lang="pug">
transition(name='signin')  
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
                ref='email'
                @input.lazy='emailValidation'
                @keydown.enter='submitSignIn'
                placeholder='이메일을 입력해 주세요.'
                aria-label='로그인 이메일'
                required
                autofocus)
              div.email-valid-false(v-show='email_valid_false')
                span.fa.fa-exclamation-circle(
                  aria-hidden="true")  {{ email_valid_warning }}
              div.email-valid-false(v-show='email_valid_empty')
                span.fa.fa-exclamation-circle(
                  aria-hidden="true")  {{ email_valid_warning }}
              label(for='signin-password')
              input(
                v-model.trim='password'
                id='signin-password' 
                type='password' 
                ref='password' 
                @input.lazy='passwordValidation'
                @keydown.enter='submitSignIn'                  
                placeholder='비밀번호를 입력해 주세요.'
                aria-label='로그인 비밀번호'                
                required)
              div.password-valid-false(v-show='password_valid_false')
                span.fa.fa-exclamation-circle(
                  aria-hidden="true")  {{ password_valid_warning }}                  
          .signin-buttons-signin
            button.signin-login(
              type='button'
              @click='submitSignIn, emailValidation, passwordValidation, validDuplicate')
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
import {mapGetters, mapMutations} from 'vuex'

let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
let passwordRegex = /^[A-Za-z0-9]{8,20}$/;

export default {
  name: 'SignIn',
  data() {
    return{
      email: '',
      password: '',
      email_valid_false: false,
      email_valid_empty: false,
      email_valid_warning: '',
      password_valid_false: false,
      password_valid_empty: false,
      password_valid_warning: '',
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
        this.email_valid_false = true
        this.email_valid_warning = '잘못된 이메일 형식입니다.'
        this.$refs.email.focus();
        return true
      } else if ( emailRegex.test(this.email) ) {
        this.email_valid_false = false  
        return false
      }
      // if ( this.email === '' ) {
      //   this.email_valid_empty = true
      //   this.email_valid_warning = '빈칸 없이 작성해주세요'
      // }
    },
    passwordValidation() {
      if ( !passwordRegex.test(this.password) ) {
        this.password_valid_false = true
        this.password_valid_warning = '비밀번호는 8자 이상, 영어와 숫자를 혼합해서 입력해 주세요.'
        this.$refs.password.focus();     
        return true   
      } else if ( passwordRegex.test(this.password) ) {
        this.password_valid_false = false
        return false
      }
    },
  },
  methods: {
    ...mapMutations([
      'openSignUp',
      'closeSignIn',
      'submitSignIn',
      // 'setUserPk',
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
        this.$router.push({
          path: '/calendar',
          // name: 'Calendar',
          //   params: {
          //     email: this.email
          //   }
        });
        let user_pk = response.data.user.pk
        window.localStorage.setItem('user_pk', user_pk);

      })
      .catch(error => {
        console.log(error.response)
        window.alert('아이디 & 비밀번호를 확인해주세요')
      })
    },
    validDuplicate() {
      this.$http.get(this.getUrlValid, {
        params: { 
          email: this.email
        }
      })
      console.log('valivali :', emailmemdmi)
      .then(response => {
        console.log(response.data)
        let error_valid = response.data;
        let props = Object.values(error_valid);
        console.log(props);
        if ( props[0] === false ) {
          window.alert('등록되지 않은 회원입니다.')
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  
  body
    overlfow: hidden

</style>