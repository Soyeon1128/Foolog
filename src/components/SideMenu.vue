<template lang="pug">
  .side-menu-wrapper
    button.side-menu-button(
      type='button'
      @click='openSideMenu')
      span.button-icon-bars.fa.fa-bars.fa-2x
      //- span.button-icon-bars.fa.fa-user-o.fa-2x
    transition(name='slide')
      .side-menu( v-if='side_menu' )
        .side-menu-header 
          button.fa.fa-angle-left(
            type='button'
            @click='closeSideMenu')
          //- h1 My page
          h1 {{ nickname }}
        .side-menu-profile-wrapper
          label.side-menu-profile(for='side-menu-profile-pic')
            input(
              id='side-menu-profile-pic' 
              type='file'
              @change='uploadProfile')
            .profile-photo-wrapper
              img.profile-img(
                :src='side_profile'
                v-if='side_profile'
              )
          span.profile-email {{ email }}
          span.fa.fa-user
        button.register-img(@click='registerProfileImg') 프로필 등록하기
        .side-menu-calendar
    .side-dim( v-if='side_menu' @click='closeSideMenu')
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'SideMenu',
  created() {
    // this.registerProfileImg()
    let user_pk = window.localStorage.getItem('user_pk', user_pk);
    this.getUserPk();
    this.getUserData();
    // console.log('testloacalStora3ge: ', this.userPk);
  },
  data() {
    return {
      nickname: '',
      email: '',
      side_menu: false,
      side_profile: '',
      side_menu_pk: '',
      file: null,
      detailData: '',
    }
  },
  computed: {
    ...mapGetters([
      'getUrlMember'
    ])
  },
  methods: {
    ...mapMutations([

    ]),
    getUserPk() {
      let get_pk = window.localStorage.getItem('user_pk');
      this.side_menu_pk = get_pk;
    },
    openSideMenu() {
      if ( this.side_menu === false ) {
        this.side_menu = true;
      }
    },
    closeSideMenu() {
      if ( this.side_menu === true ) {
        this.side_menu = false;
      }
    },
    uploadProfile(e) {
      console.log('e.target:', e.target.files[0]);
      this.file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (f) => {
      this.side_profile = f.srcElement.result; 
      }
    },
    registerProfileImg() {
      let user_token = window.localStorage.getItem('token');
      let pk = window.localStorage.getItem('user_pk')      
      let form = new FormData();
      // form.append('nickname', '푸로구')
      // form.append('password1', '1q2w3e4r')
      // form.append('password2', '1q2w3e4r')
      form.append('profile_img', this.file)
      
      this.$http.patch(this.getUrlMember + pk + '/', form, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(response => {
        console.log(response)
        window.alert('프로필 사진이 등록되었습니다.');
      })
      .catch(error => {
        console.log(error)
        console.log(error.response)
      })
    },
    getUserData() {
      let pk = this.side_menu_pk;
      this.$http.get(this.getUrlMember + pk + '/')
      .then(response => {
        console.log('response.data.nickname:', response.data.nickname);
        let nickname = response.data.nickname
        let email = response.data.email
        let profile = response.data.profile_img
        if( nickname ) {
          this.nickname = nickname
        } 
        if( email ) {
          this.email = email
        } 
        if( profile ) {
          this.side_profile = profile
        }
        console.log('response :',response)
        
      })
      .catch(error => {
        console.log(error)
        let data = response.data;
        // console.log('response:', response);
        // console.log('this.$route.params.pk:', this.$route.params.pk);
      }) 
      .catch(error => {
        // console.log(error);
      })
    }
  },
}
</script>
