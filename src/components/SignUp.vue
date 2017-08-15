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
              label(for='signup-email')
                input(v-model.trim='email' 
                  id='signup-email' 
                  type='email' 
                  placeholder='이메일을 입력해 주세요.' 
                  @input.lazy='validateEmail'
                  aria-label='회원가입 이메일'
                  autofocus
                  required
                  )
                div.email-valid-false(v-show='email_valid_false')
                  span.fa.fa-exclamation-circle(aria-hidden="true")  이미 등록된 이메일입니다.
                //- div.email-valid-true(v-show='email_valid_true')
                //-   span(aria-hidden="true") 사용가능한 이메일 입니다.
                div.email-valid-empty(v-show='email_valid_empty')
                  span.fa.fa-exclamation-circle(aria-hidden="true")  빈칸 없이 작성해 주세요.
              label(for='signup-nickname')
                input(v-model.trim='nickname' 
                  id='signup-nickname' 
                  type='text' 
                  placeholder='닉네임을 입력해 주세요.' 
                  @input.lazy='validateNickname'
                  aria-label='회원가입 닉네임'                  
                  required
                  )
                div.nickname-valid-false(v-show='nickname_valid_false')
                  span.fa.fa-exclamation-circle(aria-hidden="true")  이미 등록된 닉네임입니다.
                div.nickname-valid-empty(v-show='nickname_valid_empty')
                  span.fa.fa-exclamation-circle(aria-hidden="true")  빈칸 없이 작성해 주세요
              label(for='signup-password')
                input(v-model.trim='password'
                  id='signup-password'
                  type='password'
                  placeholder='비밀번호는 8자 이상, 영어와 숫자를 혼용해서 입력해 주세요.' 
                  @keydown.enter='submitSignUp'
                  aria-label='회원가입 비밀번호'                  
                  required                  
                  )
          .signup-buttons-signup
            button.signup-btn(
              type='button'
              @click='submitSignUp')
              span 회원가입
          hr
          p.signup-notice-facebook Facebook아이디로 간편하게 로그인 할 수 있습니다.
</template>

<script>
import {mapGetters} from 'vuex' 
import {mapMutations} from 'vuex'
 
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
      nickname: '',
      password: '',
      email_valid_false: false,
      // email_valid_true: false,
      email_valid_empty: false,
      nickname_valid_false: false,
      nickname_valid_empty: false,
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
      'openSignIn',
      'closeSignUp',
      'submitSignUp'
    ]),
    validateEmail() {
      this.$http.get(this.$store.state.url_valid, {
        params: { 
          email: this.email 
        }
      })
      .then(response => {
        console.log(response)
        let error_valid = response.data;
        let props = Object.values(error_valid);
        console.log(props);
        
        if ( props[0] === false ) {
          this.email_valid_false = true
          this.email = ''
        } else if ( props[0] === true ) {
          this.email_valid_false = false          
          this.email_valid_empty = false
          // this.email_valid_true = true
        } else if ( props[0] === null ) {
          this.email_valid_empty = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    validateNickname() {
      this.$http.get(this.$store.state.url_valid, {
        params: { 
          nickname: this.nickname 
        }
      })
      .then(response => {
        console.log(response)
        let error_valid = response.data;
        let props = Object.values(error_valid);
        console.log(props);
        if ( props[1] === false ) {
          this.nickname_valid_false = true
          this.nickname = ''
        } else if ( props[1] === true ) {
          this.nickname_valid_false = false
          this.nickname_valid_empty = false
        } else if ( props[0] === null) {
          this.nickname_valid_empty = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    submitSignUp() {
      // console.log(this.$store.state.url_users);     
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
        for (let i = 0, length = props.length; i < length; i++) {
          console.log(props[i] + ' : ' + error_data[props[i]][0]);
          window.alert(props[i] + ' : ' + error_data[props[i]][0]);
          break;
        }
        
        console.log(error_data)
        console.log(error.response);
      });
      this.email    = '', 
      this.nickname = '', 
      this.password = '';
    }
  }
}
</script>

<style lang="sass" scoped>
  
  body
    overlfow: hidden

</style>