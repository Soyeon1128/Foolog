<template lang="pug">
  .header-container.susy-header
    side-menu( v-if='side_menu' )
    header.header
      //- button.header-button-sidemenu(
      //-   type='button'
      //-   @click='openSideMenu')
        span.header-icon-bars.fa.fa-bars.fa-2x
      h1.header-logo
        a.header-logo-button(@click='goToHome') Foolog 
</template>

<script>
import SideMenu from './SideMenu'

export default {
  name: 'HeaderLogo',
  data() {
    return {
      side_menu: false
    }
  },
  components: {
    SideMenu,     
  }, 
  computed: {
    // ...mapGetters(['sideMenu',])
  },
  methods: {
    goToHome() {
      this.$router.push( {name: 'Home'} );
    },
    openSideMenu() {
      if( this.side_menu === false ) {
        this.side_menu = true
      }
      console.log('side_menu:', this.side_menu);
    }
  },
}
</script>

