<template lang="pug">
  .post-container
    header-logo
    header-slogan
    post-add-button
    post-empty(v-if='postEmpty')
    post-before-save(v-if='postBeforeSave')
      //- post-map
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import PostEmpty from './PostEmpty'
import PostAddButton from './PostAddButton'
import PostBeforeSave from '../Post/PostBeforeSave'
import PostAfterSave from '../Post/PostAfterSave'
// import PostMap from '../Post/PostMap'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, PostAddButton, 
    PostEmpty, PostBeforeSave, PostAfterSave, 
    // PostMap 
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


