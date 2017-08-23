<template lang="pug">
  .post
    side-menu
    header-logo 
    header-slogan
    post-add-button
    post-before(v-if="isBefore" style="margin-bottom: 735px")
    post-before(v-if="isModify")
    post-empty(v-if="isEmpty")
    post-after(v-if="isAfter")
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
import PostMap from './PostMap'

export default {
  name: 'Post',
  components: {
    HeaderLogo, SideMenu, HeaderSlogan, PostAddButton,
    PostEmpty, PostBefore, PostAfter,
    PostMap,
  },
  created() {
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
      'isMap',
      'mapChangeClass',
      'mapStyle',
    ])
  },
  methods: {
    ...mapMutations([
      'changeDateFormat',
      'showAllDayData',
      'imgUpload',
      'getFoodTagValue',
      'getTasteTagValue',
      'showAllDayData',      
      'postList',
      'modalMap'
    ]),
    ...mapActions([
    ]),
  }
}
</script>

<style lang="sass">

.post-area-container
  margin-top: 12%

</style>
