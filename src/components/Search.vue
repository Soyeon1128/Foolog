<template lang="pug">
  .search-container
    side-menu
    header-logo
    .header-img
      img(src="../assets/header-img/header-img-1.png")
    .slogan-group
      p.slogan-love.susy-slogan-1 Love, Eat and
      p.slogan-write.susy-slogan-2 Search Your Diary
    .search-input-area
      form
        legend 검색창
        fieldset
          label(for="search")
            input.search-input(v-model="searchKeyword" type="text" id="search" value="" placeholder="검색어를 입력해 주세요")
            button.search-input-button(@click="searchTargetKeyword" type="button")
                span.fa.fa-search
    .search-index-area(v-if="isSearchData")
      p.search-result-index
        span.result-index {{ searchKeyword }}
        span  에 대한 검색 결과
      p.search-result-count
        span 총
        span.result-count  {{ searchLength }}
        span 건
    .search-result-area(v-if="isSearchData" v-for="(item, index) in searchData")
      .search-post-area
        .search-photo-wrapper
          .search-photo
            img(:src="item.photo")
        .search-diary-wrapper
          .search-diary-1
            span.fa.fa-calendar  날짜 아직 안함 !
            button.fa.fa-map-marker.fa-lg(type='button')  잠원동 신선횟집
          .search-diary-2
            textarea.search-text(type="text" name="searchtext" readonly="readonly") {{ item.text }}
          .search-diary-3   
            .search-tags-food
              span 음식 종류
              .search-tag-food(v-if="item.tags[0]" :style="{'background': item.tags[0].color}") {{ item.tags[0].text }}
            .search-tags-taste
              span 맛 평가
              span.search-tag-taste.fa.fa-lg(v-if="item.tags[1]" :class="assignTasteClass(item.tags[1].text)")
    .search-no-result-area(v-if="!isSearchData")
      p 검색 결과가 없습니다.
      | 다른 검색어를 입력해보세요. 
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

import HeaderLogo from './Header'
import SideMenu from './SideMenu'

export default {
  name: 'Search',
  components: {
    HeaderLogo, SideMenu
  },
  data() {
    return {
      'searchKeyword': '',
      'searchLength': 0,
      'isSearchData': false,
      'searchData': '',
    }
  },
  methods: {
    searchTargetKeyword() {
      let user_token = window.localStorage.getItem('token');
      let search_url = 'http://api.foolog.xyz/search/'
      this.$http.get(search_url, {
          headers: { 'Authorization' : `Token ${user_token}` },
          params: {
            'q': this.searchKeyword,
            'tags': ''
          }
      })
      .then(response => {
        console.log('통신된거?');
        let data = response.data;
        let length = response.data.length;

        this.searchData = data;
        this.searchLength = length;

        if( length === 0 ) {
          this.isSearchData = false;
        }
        else if ( length > 0 ) {
          this.searchData = data;
          this.isSearchData = true;
        }

        console.log('this.searchData',this.searchData);
        console.log('this.searchLength',this.searchLength);
        console.log('this.isSearchData',this.isSearchData);

      })
      .catch(error => {
        console.log(error);
      })
    },
    assignTasteClass(taste) {
      switch(taste) {
        case 'Good':
          return 'fa-smile-o';
        case 'Soso':
          return 'fa-meh-o';
        case 'Bad':
          return 'fa-frown-o';
      }
    },
  }
}
</script>

<style lang="sass">

</style>

