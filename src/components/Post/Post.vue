<template lang="pug">
  .post-container
    header-logo
    header-slogan
    post-list
     
   

</template>

<script>
import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import PostList from '../Post/PostList'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, PostList
  }
}
</script>



