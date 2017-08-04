<template lang="pug">
  header.header
    button(type="button")
      span.icon-bars.fa.fa-bars.fa-2x
    h1.header-logo Foolog
</template>

<script>
export default {
  name: 'HeaderLogo',
}
</script>

<style lang="sass">

@import '~reset'

.header
  position: relative

.header button 
  width: 60px
  height: 60px
  border: none
  background: none
  position: absolute
  top: 0
  left: 20px

.icon-bars
  color: #fff

.header-logo
  background: #fe836d
  height: 60px
  line-height: 60px
  text-align: center
  margin: 0
  color: #fff
  font-size: 26px
  
</style>


