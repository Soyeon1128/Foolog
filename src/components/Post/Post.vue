<template lang="pug">
  .post-container
    header-logo 
    header-slogan
    post-add-button
    post-one
    //- post-after
    //- router-view
    //- post-map
    //- post-map-test
</template>

<script>
// import {mapGetters} from 'vuex'
// import {mapMutations} from 'vuex'

import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import PostAddButton from './PostAddButton'
import PostOne from './PostOne'
import PostBefore from '../Post/PostBefore'
import PostAfter from '../Post/PostAfter'
// import PostMap from '../Post/PostMap'
// import PostMapTest from '../Post/PostMapTest'
import PostMapFirst from '../Post/PostMapfirst'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, PostAddButton,
    PostBefore, PostAfter, PostMapFirst
    // PostMap, PostMapTest
  },
  data () {
    return {
 
    }
  }
}
</script>


