<template lang="pug">
  .home-container
    header-logo
    sign-in( v-show='signIn' )
    sign-up( v-show='signUp' )
    video-bg
    .home-slogan.susy-home( v-show='mainView' )
      main.home-slogan-first
        p Love, Eat, and 
        p Write Your Diary
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
    p.project-info
      span.info-1 Fastcampus Team Project 2017 2Q - Team1 Foolog
      span.info-2 Front-end Developer
      a(href="https://github.com/Soyeon1128" target="_blank")
        span.fa.fa-github-square
        span.name 강소연
      a(href="https://github.com/hw0615" target="_blank")
        span.fa.fa-github-square
        span.name 전현우 
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import VideoBg from './Video'
import HeaderLogo from './Header'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Calendar from './Calendar'
import Post from './Post/Post'
import Search from './Search'

export default {
  name: 'Home',
  components: {
    VideoBg, HeaderLogo, SignIn, SignUp,
    Calendar, Post, Search
  },
  created() {
    this.hideSearchBtn();
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
      'hideSearchBtn',
      'openSignUp',
      'openSignIn'
    ]),
  }
}
</script>

<style lang="sass" scoped>
  
  body
    overlfow: hidden

  .project-info
    position: absolute
    bottom: 2%
    left: 50%
    transform: translateX(-50%)
    color: #444

  .project-info a
    text-decoration: none
    color: #444
    font-size: 30px
  
  .info-1
    margin-right: 15px
  
  .info-2
    margin-right: 3px

  .fa-github-square
    font-size: 20px
    margin-left: 10px
    margin-right: 7px
    cursor: pointer
  
  .name
    font-size: 15px

</style>

