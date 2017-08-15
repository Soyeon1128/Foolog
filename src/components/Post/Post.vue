<template lang="pug">
  .post-container
    header-logo 
    header-slogan
    post-add-button
    router-view
    //- post-before
    //- post-after
</template>

<script>
// import {mapGetters} from 'vuex'
// import {mapMutations} from 'vuex'

import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import PostAddButton from './PostAddButton'
import PostBefore from '../Post/PostBefore'
import PostAfter from '../Post/PostAfter'
import PostMap from '../Post/PostMap'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, PostAddButton, 
    PostBefore, PostAfter,
    // PostMap 
  },
  data () {
    return {
 
    }
  }
}
</script>


