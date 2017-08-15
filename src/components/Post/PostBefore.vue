<template lang="pug">
  .post-before-wrapper
    post-empty(v-if='postEmpty')
    post-before-save(v-if='postBeforeSave')
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

import PostEmpty from './PostEmpty'
import PostBeforeSave from '../Post/PostBeforeSave'

export default {
  name: 'PostBefore',
  components: {
    PostEmpty, PostBeforeSave
  },
  data () {
    return {
 
    }
  },
  computed: {
    ...mapGetters([
      'postEmpty',
      'postBeforeSave',
      'postAfterSave'
    ])
  },
  methods: {
    ...mapMutations([
      'openPostBefore',
    ])
  }

}
</script>

