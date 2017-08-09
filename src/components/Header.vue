<template lang="pug">
  .header-container.susy-header
    header.header
      button.header-button-sidemenu(type='button')
        span.header-icon-bars.fa.fa-bars.fa-2x
      h1.header-logo
        a.header-logo-button(@click='goToHome') Foolog 
</template>

<script>
export default {
  name: 'HeaderLogo',
  components: {
     
  }, 
  methods: {
    goToHome() {
      this.$router.push( {name: 'Home'} );
    }
  },
  // methods: {
  //   ...mapMutations([
  //     'goToHome'
  //   ])
  // }
}
</script>

