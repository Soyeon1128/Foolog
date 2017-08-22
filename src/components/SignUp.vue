<template lang="pug">
transition(name='signup')  
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
              label(for='signup-email')
                input(
                  v-model.trim='email' 
                  id='signup-email' 
                  type='email'
                  ref='email' 
                  @input.lazy='emailValidation'
                  placeholder='이메일을 입력해 주세요.' 
                  aria-label='회원가입 이메일'
                  autofocus
                  required)
                div.email-valid-false(v-show='email_valid_false')
                  span.fa.fa-exclamation-circle(aria-hidden="true")  {{ email_valid_warning }}
              label(for='signup-nickname')
                input(
                  v-model.trim='nickname' 
                  id='signup-nickname' 
                  type='text' 
                  ref='nickname'
                  @input.lazy='nicknameValidation'
                  placeholder='닉네임을 입력해 주세요.' 
                  aria-label='회원가입 닉네임'                  
                  required)
                div.nickname-valid-false(v-show='nickname_valid_false')
                  span.fa.fa-exclamation-circle(aria-hidden="true")  {{ nickname_valid_warning }}
              label(for='signup-password')
                input(
                  v-model.trim='password'
                  id='signup-password'
                  type='password'
                  ref='password'
                  @input.lazy='passwordValidation'
                  @keydown.enter='joinValid'
                  placeholder='비밀번호는 8자 이상, 영어와 숫자를 혼용해서 입력해 주세요.' 
                  aria-label='회원가입 비밀번호'                  
                  required)
                div.password-valid-false(v-show='password_valid_false')
                  span.fa.fa-exclamation-circle(aria-hidden="true")  {{ password_valid_warning }}
          .signup-buttons-signup
            button.signup-btn(
              type='button'
              @click='joinValid')
              span 회원가입
          hr
          p.signup-notice-facebook Facebook아이디로 간편하게 로그인 할 수 있습니다.
</template>

<script>
import {mapGetters, mapMutations} from 'vuex' 
 
let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
let passwordRegex = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

export default {
  name: 'SignUp',
  mounted () {
  },
  directives: {
    focus: {
      
    }
  },
  data() {
    return{
      email:    '',
      email_valid_warning: '',
      email_valid_false: false,
      nickname: '',
      nickname_valid_warning: '',
      nickname_valid_false: false,
      password: '',
      password_valid_warning: '',
      password_valid_false: false,
    }
  },
  computed: {
    ...mapGetters([
      'signUp',
      'signIn',
      'mainView',
      'getUrlValid'
    ])
  },
  methods: {
    ...mapMutations([
      'openSignIn',
      'closeSignUp',
    ]),
    emailValidation() {
      if( !emailRegex.test(this.email) ) {
        this.email_valid_false = true
        this.email_valid_warning = '잘못된 이메일 형식입니다.'
        this.$refs.email.focus()
        return false
      } else if ( emailRegex.test(this.email) ) {
        this.email_valid_false = false  
        return true
      }
    },
    nicknameValidation() {
      this.$http.get(this.$store.state.url_valid, {
        params: { 
          nickname: this.nickname 
        }
      })
      .then(response => {
        let error_valid = response.data;
        let props = Object.values(error_valid);
        console.log(props);
        if ( props[1] === false ) {
          this.nickname_valid_false = true
          this.nickname_valid_warning = '이미 등록된 닉네임입니다.'
          this.$refs.nickname.focus()
        } else if ( props[1] === true) {
          this.nickname_valid_false = false
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    passwordValidation() {
      if ( !passwordRegex.test(this.password) ) {
        this.password_valid_false = true
        this.password_valid_warning = '비밀번호는 8자 이상, 영어와 숫자를 혼합해서 입력해 주세요.'
        this.$refs.password.focus();     
        return false
      } else if ( passwordRegex.test(this.password) ) {
        this.password_valid_false = false
        return true
      }
    },
    joinValid() {
      this.submitSignUp()
      this.$http.get(this.getUrlValid, {
        params: { 
          email: this.email 
        }
      })
      .then(response => {
        let error_valid = response.data;
        let props = Object.values(error_valid);
        console.log(props);
        
        if ( props[0] === false ) {
          window.alert('이미 등록된 회원입니다.')
          this.$refs.email.focus();         
        } 
      })
      .catch(error => {
        console.log(error)
      })
    },
    // validateEmail() {
    //   this.$http.get(this.getUrlValid, {
    //     params: { 
    //       email: this.email 
    //     }
    //   })
    //   .then(response => {
    //     let error_valid = response.data;
    //     let props = Object.values(error_valid);
    //     console.log(props);
        
    //     if ( props[0] === false ) {
    //       this.email_valid_false = true
    //       this.email = ''
    //     } else if ( props[0] === true ) {
    //       this.email_valid_false = false          
    //       this.email_valid_empty = false
    //       // this.email_valid_true = true
    //     } else if ( props[0] === null ) {
    //       this.email_valid_empty = true
    //     } 
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // },
    // validateNickname() {
    //   this.$http.get(this.$store.state.url_valid, {
    //     params: { 
    //       nickname: this.nickname 
    //     }
    //   })
    //   .then(response => {
    //     console.log(response)
    //     let error_valid = response.data;
    //     let props = Object.values(error_valid);
    //     console.log(props);
    //     if ( props[1] === false ) {
    //       this.nickname_valid_false = true
    //       // this.nickname = ''
    //     } else if ( props[1] === true ) {
    //       this.nickname_valid_false = false
    //       this.nickname_valid_empty = false
    //     } else if ( props[0] === null) {
    //       this.nickname_valid_empty = true
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // },
    submitSignUp() {
      if(!this.emailValidation()) return
      if(!this.nicknameValidation()) return
      if(!this.passwordValidation()) return
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
        // for (let i = 0, length = props.length; i < length; i++) {
        //   console.log(props[i] + ' : ' + error_data[props[i]][0]);
        //   window.alert(props[i] + ' : ' + error_data[props[i]][0]);
        //   break;
        // }
        console.log(error.response);
      });
    }
  }
}
</script>

<style lang="sass" scoped>
  
  body
    overlfow: hidden

</style>