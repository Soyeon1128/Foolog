<template lang="pug">
  .signin-container.susy-user
    .user-content-border
      main.user-content
        button.user-delete X
        .user-buttons
          button.user-signin 로그인
          button.user-signup 회원가입
        .user-input-box
          .user-input
            form
              legend 로그인 및 회원가입 폼
              fieldset
                label(for='email')
                  input#email(type='email', value='', placeholder='이메일을 입력해 주세요')
                label(for='password')
                  input#password(type='password', value='', placeholder='비밀번호를 6자 이상 입력해 주세요.')
            .user-buttons-signin
              button.user-login
                span 로그인
              button.user-facebook
                span 페이스북 아이디로 로그인
            hr
            p.notice-facebook Facebook아이디로 간편하게 로그인 할 수 있습니다.
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return{

    }
  }
}
</script>

<style lang="sass">

</style>
