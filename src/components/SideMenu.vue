<template lang="pug">
  .side-menu-wrapper
    button.side-menu-button(
      type='button'
      @click='openSideMenu')
      span.button-icon-bars.fa.fa-bars.fa-2x

    .side-menu( v-if='side_menu' )
      .side-menu-header 
        //- .side-menu-dim
        button.fa.fa-angle-left(
          type='button'
          @click='closeSideMenu')
        h1 My page
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
        span.fa.fa-user
    .side-menu-user-nickname {{  }}
</template>

<script>
export default {
  name: 'SideMenu',
  created() {
    // this.getData();
    this.getUserPk();
  },
  data() {
    return {
      side_menu: false,
      side_profile: '',
      file: null,
      detailData: ''
    }
  },
  methods: {
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
      this.file = e.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (f) => {
      this.side_profile = f.srcElement.result; 
      }
    },
    // getData() {
    //   let user_token = window.localStorage.getItem('token');
    //   let userDetail = this.$store.state.url_users + user_token + '/';
    //   this.$http.get(this.$store.state.url_users, {
    //     headers: { 'Authorization' : `Token ${user_token}`}
    //   })
    //   .then(response => {
    //     let detailData = response.data;
    //     console.log('dd', detailData);
    //     // console.log('dkjfaslkdf', this.$route.params.email);
    //     // console.log('뷰엑스..', this.$store.state);
        
    //   })
    //   .catch(error => {
    //     console.log(error);
        
    //   })
    // }
    getUserPk() {
      let user_token = window.localStorage.getItem('token');
      let userPk = this.$store.state.url_users + 
      this.$http.get(this.$store.state.url_users + 26 + '/',{
        headers: { 'Authorization' : `Token ${user_token}`}
      })
      // this.$http.post(this.$store.state.url_login, {

      // })
      .then(response => {
        let data = response.data;
        console.log('response:', response);
        console.log('this.$route.params.pk:', this.$route.params.pk);
      }) 
      .catch(error => {
        console.log(error);
      })
    }
  },
}
</script>
