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
              label(for='email')
                input(
                  id='email'
                  type='email'
                  placeholder='이메일을 입력해 주세요.'
                  required='required'
                  autofocus='autofocus')
              label(for='password')
                input(
                  id='password' 
                  type='password' 
                  placeholder='비밀번호를 입력해 주세요.'
                  required='required')
          .signin-buttons-signin
            button.signin-login(type='button')
              span 로그인
            button.signin-facebook(type='button')
              span 페이스북 아이디로 로그인
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

    }
  },
  computed: {
    ...mapGetters([
      'signUp',
      'signIn',
      'mainView'
    ])
  },
  methods: {
    ...mapMutations([
      'openSignUp',
      'closeSignIn',
    ]),
  }
}
</script>
