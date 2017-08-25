<template lang="pug">
  #app(:style="mapStyle")
    router-view
    #fb-root
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'mapStyle'
      ])
    }
  }
</script>

<style lang="sass">

@import './sass/app'

</style>
