<template lang="pug">
  .post-container
    header-logo 
    side-menu
    header-slogan
    post-add-button
    post-one
    //- post-after
    //- router-view
    //- post-map
</template>

<script>
// import {mapGetters} from 'vuex'
// import {mapMutations} from 'vuex'

import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import SideMenu from '../SideMenu'
import PostAddButton from './PostAddButton'
import PostOne from './PostOne'
import PostBefore from '../Post/PostBefore'
import PostAfter from '../Post/PostAfter'
import PostMap from '../Post/PostMap'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, SideMenu, PostAddButton,
    PostBefore, PostAfter, PostMap, 
    PostOne, 
  },
  data () {
    return {
 
    }
  }
}
</script>


