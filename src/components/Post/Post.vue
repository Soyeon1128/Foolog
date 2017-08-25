<template lang="pug">
transition(name="post")
  .post
    side-menu
    header-logo 
    header-slogan
    post-add-button
    post-before(v-if="isBefore" style="margin-bottom: 735px")
    post-before(v-if="isModify")
    post-empty(v-if="isEmpty")
    post-after(v-if="isAfter")
    spinner(v-if="isLoading")
    post-map(:class="mapChangeClass") 
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

import HeaderLogo from '../Header'
import SideMenu from '../SideMenu'
import HeaderSlogan from '../HeaderSlogan'
import PostAddButton from './PostAddButton'
import PostEmpty from './PostEmpty'
import PostBefore from './PostBefore'
import PostAfter from './PostAfter'
import Spinner from '../Spinner'
import PostMap from './PostMap'

export default {
  name: 'Post',
  components: {
    HeaderLogo, SideMenu, HeaderSlogan, PostAddButton,
    PostEmpty, PostBefore, PostAfter,
    PostMap, Spinner
  },
  created() {
    this.resetMap();
    this.showSearchBtn();
    this.changeDateFormat(this.$route.params.date);    
    this.showAllDayData();
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'isEmpty',
      'isAfter',
      'isBefore',
      'isModify',
      'allDayData',
      'postKeys',
      'postDate',
      'isLoading',
      'isMap',
      'mapChangeClass',
      'mapStyle',
    ])
  },
  methods: {
    ...mapMutations([
      'showSearchBtn',
      'changeDateFormat',
      'showAllDayData',
      'imgUpload',
      'getFoodTagValue',
      'getTasteTagValue',
      'showAllDayData',      
      'postList',
      'resetMap'
      // 'modalMap'
    ]),
    ...mapActions([
    ]),
  }
}
</script>

<style lang="sass">

// post 애니메이션
.post-enter, .post-leave-top
  opacity: 0
.post-enter-active
  transition: opacity 0.7s ease

.post-area-container
  margin-top: 12%

</style>
