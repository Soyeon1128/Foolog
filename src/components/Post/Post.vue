<template lang="pug">
  .post-container
    header-logo
    header-slogan
    post-add-button
    //- post-empty
    //- post-list
    //- post-map
</template>

<script>
import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import PostEmpty from './PostEmpty'
import PostAddButton from './PostAddButton'
import PostList from '../Post/PostList'
import PostMap from '../Post/PostMap'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, PostAddButton, PostEmpty, PostList, PostMap 
  }
}
</script>



