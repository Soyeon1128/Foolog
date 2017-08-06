<template lang="pug">
  .signup-container.susy-user
    main.signup-content-wrapper
      .signup-content-wrapper-inside  
        button.signup-content-wrapper-inside-delete(
          type='button'
          @click='closeSignUp') X
        .signup-content-buttons
          button.signup-content-buttons-signin(
            type='button'
            @click='openSignIn') 로그인
          button.signup-content-buttons-signup(type='button') 회원가입
        .signup-input
          form
            legend 로그인 및 회원가입 폼
            fieldset
              label(for='email')
                input#email(type='email', value='', placeholder='이메일을 입력해 주세요')
              label(for='nickname')
                input#nickname(type='text', value='', placeholder='닉네임을 입력해 주세요.')
              label(for='password')
                input#password(type='password', value='', placeholder='비밀번호를 6자 이상 입력해 주세요.')
          .signup-buttons-signup
            button.signup-btn(type='button')
              span 회원가입
          hr
          p.signup-notice-facebook Facebook아이디로 간편하게 로그인 할 수 있습니다.
</template>

<script>
import {mapGetters} from 'vuex' 

export default {
  name: 'SignUp',
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
    openSignIn() {
      this.$store.commit('openSignIn')
    },
    closeSignUp() {
      this.$store.commit('closeSignUp')
    }
  }
}
</script>