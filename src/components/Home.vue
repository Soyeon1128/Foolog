<template lang="pug"> 
  .home-container
    header-logo
    sign-in(
      v-show='signIn'
    )
    sign-up(
      v-show='signUp'
    )
    video-bg
    .home-slogan.susy-home(
      v-show='mainView'
    )
      main.home-slogan-first
        p Love, Eat, and Write Your Diary
      main.home-slogan-second
        | 오늘 먹었던 맛있는 음식을 남기는 나만의 공간. 
        br
        | 자신만의 맛있는 일기장을 만들어 보세요!  
      .home-buttons
        button.home-buttons-signup(
          type='button' 
          @click='openSignUp') 회원가입
        button.home-buttons-signin(
          type='button'
          @click='openSignIn') 로그인
</template>

<script>
import {mapGetters} from 'vuex'
import VideoBg from './Video'
import HeaderLogo from './Header'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default {
  name: 'Home',
  components: {
    VideoBg,
    HeaderLogo,
    SignIn,
    SignUp
  },
  data() {
    return {

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
    openSignUp() {
      this.$store.commit('openSignUp')
    },
    openSignIn() {
      this.$store.commit('openSignIn') 
    }
  }
}
</script>

