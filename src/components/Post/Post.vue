<template lang="pug">
  .post
    //- post-map
    side-menu
    header-logo 
    header-slogan
    post-add-button
    post-before(v-if="isBefore" style="margin-bottom: 735px")
    post-before(v-if="isModify")
    post-empty(v-if="isEmpty")
    post-after(v-if="isAfter")
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
import PostMap from '../Post/PostMap'

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
    ]),
    ...mapActions([
    ]),
//     clickSaveBtn() {
//       let form = new FormData();
//       if ( this.post_keys.text.trim() !== '' ) {
//         form.append('text', this.post_keys.text);
//       }
//       if ( this.file ) {
//         form.append('photo', this.file);
//       }
//       if ( this.post_keys.tags_food && this.post_keys.tags_taste.trim() !== '' ) {
//         form.append('tags', this.post_keys.tags_food+', '+this.post_keys.tags_taste);
//       }
//       if ( this.post_keys.date ) {
//         form.append('date', this.post_keys.date);
//       }
//       if ( this.post_keys.longitude ) {
//         form.append('longitude', this.post_keys.longitude);
//       }
//       if ( this.post_keys.latitude ) {
//         form.append('latitude', this.post_keys.latitude);
//       }
//       if ( this.post_keys.memo.trim() !== '' ) {
//         form.append('memo', this.post_keys.memo);
//       }
//       if ( this.post_keys.title.trim() !== '' ) {
//         form.append('title', this.post_keys.title);
//       }
//       let user_token = window.localStorage.getItem('token');
//       this.$http.post(this.$store.state.url_post, form, {
//         headers: { 'Authorization' : `Token ${user_token}` }
//       })
//       .then(res => {
//         this.afterSave();
//         window.alert('일기가 등록되었습니다.');
//       })
//       .catch(err => {
//         console.log(err);
//         console.log(err.response);
//       })
//     },
//     
//     clickCloseBtn() { 
//       this.before = false;
//       if ( this.length === 0 ) {
//         this.empty = true;
//       }
//       else if ( this.length > 0 ) {
//         this.empty = false;
//         this.after = true;
//       }
//     },
//     clickDeleteBtn(e) {
//       let confirmDelete = confirm("일기를 삭제 하시겠습니까?");
//       if ( confirmDelete === true ) {
//         let targetListPk = e.target.value;
//         let deleteUrl = this.$store.state.url_post + targetListPk + '/';
//         let user_token = window.localStorage.getItem('token');      
//         this.$http.delete(deleteUrl, {
//           headers: { 'Authorization' : `Token ${user_token}`}
//         })
//         .then(response => {
//           this.afterSave();
//         })
//         .catch(error => {
//           console.log(error);
//         })
//       }
//       else if ( confirmDelete === false ) {
//         this.afterSave();
//       }
//     },
//     clickModifyBtn(index) {
//       let editData = this.saveData.splice(index, 1);
//       this.before = true;
//       this.post_keys = editData[0];
//     },
//     imgUpload(e) {
//       this.file = e.target.files[0];
//       let reader = new FileReader();
//       reader.readAsDataURL(this.file);
//       reader.onload = (f) => {
//         this.post_keys.photo = f.srcElement.result; 
//       }
//     },
//     getFoodTagValue(e) {
//       let value = e.target.attributes[0].value
//       this.post_keys.tags_food = value
//     },
//     getTasteTagValue(e) {
//       let value = e.target.attributes[0].value
//       this.post_keys.tags_taste = value      
//     },
  }
}
</script>

<style lang="sass">

.post-area-container
  margin-top: 12%

</style>
