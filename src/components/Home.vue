<template lang="pug"> 
  .home-container
    header-logo
    sign-in
    video-bg
    .home-slogan.susy-home
      main.home-slogan-first
        p Love, Eat, and Write Your Diary
      main.home-slogan-second
        | 오늘 먹었던 맛있는 음식을 남기는 나만의 공간. 
        br
        | 자신만의 맛있는 일기장을 만들어 보세요!  
      .buttons
        button.buttons-signup 회원가입
        button.buttons-signin 로그인
</template>

<script>
import VideoBg from './Video'
import HeaderLogo from './Header'
import SignIn from './SignIn'

export default {
  name: 'Home',
  components: {
    VideoBg,
    HeaderLogo,
    SignIn,
  },
  data() {
    return {

    }
  }
}
</script>

