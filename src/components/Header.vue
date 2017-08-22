<template lang="pug">
  .header-container.susy-header
    //- side-menu
    header.header
      //- button.header-button-sidemenu(
      //-   type='button'
      //-   @click='openSideMenu')
        span.header-icon-bars.fa.fa-bars.fa-2x
      .header-logo
        img.header-logo-img(src='../assets/Foolog-color.svg')
        a.header-logo-button(@click='goToHome') Foolog 
</template>

<script>
import SideMenu from './SideMenu'

export default {
  name: 'HeaderLogo',
  components: {
    SideMenu,     
  }, 
  methods: {
    goToHome() {
      this.$router.push( {name: 'Home'} );
    },

  },
}
</script>

