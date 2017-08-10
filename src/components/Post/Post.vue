<template lang="pug">
  .post-container
    header-logo
    header-slogan
    post-add-button
    post-list
    //- post-list
</template>

<script>
import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import PostEmpty from './PostEmpty'
import PostAddButton from './PostAddButton'
import PostList from '../Post/PostList'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, PostEmpty, PostAddButton, PostList,
  }
}
</script>



