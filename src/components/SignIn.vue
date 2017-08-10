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
                  v-model='email'
                  id='signin-email'
                  type='email'
                  placeholder='이메일을 입력해 주세요.'
                  required='required'
                  autofocus='autofocus'
                  @keydown.enter='submitSignIn'
                  )
              label(for='signin-password')
                input(
                  v-model='password'
                  id='signin-password' 
                  type='password' 
                  placeholder='비밀번호를 입력해 주세요.'
                  required='required'
                  @keydown.enter='submitSignIn'                  
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
            //- button.signin-facebook(type='button')
            //-   span.fa.fa-facebook 
            //-   span 페이스북 아이디로 로그인
          hr
          p.signin-notice-facebook Facebook아이디로 간편하게 로그인 할 수 있습니다.
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

export default {
  name: 'SignIn',
  data() {
    return{
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters([
      'signUp',
      'signIn',
      'mainView',
      'getUrlLogin'
    ])
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