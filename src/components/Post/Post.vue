<template lang="pug">
  .post-container
    header-logo
    header-slogan
    post-add-button
    post-empty
    //- post-empty(v-if="해당 날짜의 인증된 유저의 글 목록이 하나도 없을 시")
    //- post-list(v-if="해당 날짜의 인증된 유저의 글 목록이 존재할 때")
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
    HeaderLogo, HeaderSlogan, PostAddButton, PostEmpty,  PostList,
  }
}
</script>



