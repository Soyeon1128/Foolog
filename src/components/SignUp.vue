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
                //- p {{ email_error }}
                input(v-model.trim='email' 
                  @input='validateEmail'
                  id='email' 
                  type='email' 
                  value='email_error'
                  placeholder='이메일을 입력해 주세요.' 
                  required='required'
                  autofocus='autofocus')
              label(for='nickname')
                input(v-model.trim='nickname' 
                  id='nickname' 
                  type='text' 
                  placeholder='닉네임을 입력해 주세요.' 
                  required='required')
              label(for='password')
                input(v-model.trim='password'
                  id='password'
                  type='password'
                  placeholder='비밀번호는 8자 이상, 영어와 숫자를 혼용해서 입력해 주세요.' 
                  required='required')
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
  data() {
    return{
      email:    '',
      nickname: '',
      password: '',
      // email_error: '',
      // nickname_error: '',
      // password_error: '',

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
      'closeSignUp'
    ]),
    validateEmail() {
      // let url = this.$store.state.url + '/api/member/'; 
      // this.$http.get(this.$store.state.url_users, function(response) {
      //   if(response.data !== )
      // })
      // .then(reponse => {

        
      // })
    },
    submitSignUp() {
      // let url = this.$store.state.url + '/api/member/';
      console.log(this.$store.state.url_users);
      this.$http.post(this.$store.state.url_users, {
        email:     this.email,
        nickname:  this.nickname,
        password1: this.password,
        password2: this.password
      })
      .then(response => {
        // console.log(error.response)                
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
