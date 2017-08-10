<template lang="pug">
  .post-container
    header-logo
    header-slogan
    post-add-button
    post-empty

     
   

</template>

<script>
import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import PostEmpty from './PostEmpty'
import PostAddButton from './PostAddButton'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, PostEmpty, PostAddButton,
  }
}
</script>

<style lang="sass">


</style>

