<template lang="pug"> 
  calendar
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import VideoBg from './Video'
import HeaderLogo from './Header'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Calendar from './Calendar/Calendar'

export default {
  name: 'Home',
  components: {
    VideoBg,
    HeaderLogo,
    SignIn,
    SignUp,
    Calendar,
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
    ...mapMutations([
      'openSignUp',
      'openSignIn'
    ]),
  }
}
</script>

