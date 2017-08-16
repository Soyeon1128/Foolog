<template lang="pug">
  .post-container
    //- empty
    .post-empty-container.susy-main(v-if="empty")
      .post-empty
        p.post-empty-group-1
          span.double-quotes-start.fa.fa-quote-left.fa-4x
          span.post-empty-text-1 아직 등록된 
          span.post-empty-highlight 일기
          span.post-empty-text-2 가 없습니다
        p.post-empty-group-2
          span.post-empty-text-3 나만의 맛있는 일기를 작성해 보세요
          span.double-quotes-end.fa.fa-quote-right.fa-4x
    //- after
    .post-save-container.susy-photo-diary-wrapper(v-if="after" v-for="(n,i) in length")
    
      .post-save-photo.susy-post-photo
        img(:src='save_keys.photo[i]' v-if='save_keys.photo[i]')
      
      .post-save-diary.susy-post-diary
        .post-save-diary-1
          span.fa.fa-clock-o.fa-lg  {{ postDate }}
          button.fa.fa-map-marker.fa-lg(type='button')  잠원동 신선횟집
        
        .post-save-diary-2
          .post-save-text {{ save_keys.text[i] }}
        
        .post-save-diary-3   
          .save-tags-food
            span 음식 종류
            .tag-food(:class="assignFoodClass(i)") {{ save_keys.tags_food[i] }}
          .save-tags-taste
            span 맛 평가
            span.tag-taste.fa.fa-lg(:class="assignTasteClass(i)")
          .save-modify
            span.fa.fa-pencil 
            button.modify-button 수정
        .post-save-delete
          button.delete-button(type='button') X
  
      
</template>

<script>
// import {mapGetters} from 'vuex'
// import {mapMutations} from 'vuex'

import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
import PostAddButton from './PostAddButton'
// import PostBefore from '../Post/PostBefore'
// import PostAfter from '../Post/PostAfter'
// import PostMap from '../Post/PostMap'
// import PostMapTest from '../Post/PostMapTest'

export default {
  name: 'PostOne',
  components: {
    HeaderLogo, HeaderSlogan, PostAddButton,
    // PostBefore, PostAfter, PostMap, PostMapTest
  },
  created() {
    this.IsListExist();
    this.changeDateFormat();
    this.showSaveData();
  },
  data () {
    return {
      empty : false,
      after: false,
      postDate: '',
      length: 0,
      save_keys: {
        text: [],
        photo: [],
        tags_food: [],
        tags_food_korean: [],
        tags_food_chinese: [],
        tags_food_japanese: [],
        tags_food_western: [],
        tags_food_etc: [],
        tags_taste_good: [],
        tags_taste_soso: [],
        tags_taste_bad: [],
        date: '',
        longitude: '',
        latitude: '',
        memo: '',
        title: ''
      },

    }
  },
  methods: {
    assignFoodClass(index) {
      return { 
        'tag-food-korean': this.save_keys.tags_food_korean[index], 
        'tag-food-chinese': this.save_keys.tags_food_chinese[index], 
        'tag-food-japanese': this.save_keys.tags_food_japanese[index], 
        'tag-food-western': this.save_keys.tags_food_western[index], 
        'tag-food-etc': this.save_keys.tags_food_etc[index]
      };
    },
    assignTasteClass(index) {
      return {
         'fa-smile-o': this.save_keys.tags_taste_good[index],
         'fa-meh-o': this.save_keys.tags_taste_soso[index],
         'fa-frown-o': this.save_keys.tags_taste_bad[index]
      };
    },
    IsListExist() {
      let user_token = window.localStorage.getItem('token');
      let url = this.$route.params.date;
      let dayListUrl = "http://api.foolog.xyz/post/day/" + url + "/"

      this.$http.get(dayListUrl, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(response => {
        this.length = response.data.length;
        if ( response.data.length === 0 ) {
          this.empty = true;
        }
        else if ( response.data.length > 0 ) {
          this.after = true;
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    changeDateFormat() {
      // 전달받은 YYYYMMDD 형식의 날짜 데이터
      let targetDate = this.$route.params.date;

      // 연, 월, 일 추출
      let year = targetDate.substring(0,4);
      let month = targetDate.substring(4,6);
      let date = targetDate.substring(6,8);

      // postDate : 글쓰기 영역에서 보여지는 날짜 (YYYY.MM.DD)
      let postDate = year + '.' + month + '.' + date;
      this.postDate = postDate;
    },
    showSaveData() {
      let user_token = window.localStorage.getItem('token');
      let url = this.$route.params.date;
      let dayListUrl = "http://api.foolog.xyz/post/day/" + url + "/"
      this.$http.get(dayListUrl, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(response => {
        let data= response.data;
        console.log(data);
        data.forEach(item => {
          // 이미지
          this.save_keys.photo.push(item.photo);
          // 텍스트
          this.save_keys.text.push(item.text);
          // 태그 - 음식 종류
          if (item.tags.length === 0) {
            item.tags.push({text:'',type:'',color:''});
          }
          
          this.save_keys.tags_food.push(item.tags[0].text);
          
          if ( item.tags[0].text === "한식" ) {
            this.save_keys.tags_food_korean.push(true);
          }
          else if ( item.tags[0].text !== "한식" ) {
            this.save_keys.tags_food_korean.push(false);            
          }
          if ( item.tags[0].text === "중식" ) {
            this.save_keys.tags_food_chinese.push(true);
          }
          else if ( item.tags[0].text !== "중식" ) {
            this.save_keys.tags_food_chinese.push(false);            
          }
          if ( item.tags[0].text === "일식" ) {
            this.save_keys.tags_food_japanese.push(true);
          }
          else if ( item.tags[0].text !== "일식" ) {
            this.save_keys.tags_food_japanese.push(false);            
          }
          if ( item.tags[0].text === "양식" ) {
            this.save_keys.tags_food_western.push(true);
          }
          else if ( item.tags[0].text !== "양식" ) {
            this.save_keys.tags_food_western.push(false);            
          }
          if ( item.tags[0].text === "기타" ) {
            this.save_keys.tags_food_etc.push(true);
          }
          else if ( item.tags[0].text !== "기타" ) {
            this.save_keys.tags_food_etc.push(false);            
          }

          // switch (item.tags[0].text) {
          //   case '한식': this.save_keys.tags_food_korean.push(true); break;
          //   case '중식': this.save_keys.tags_food_chinese.push(true); break;
          //   case '일식': this.save_keys.tags_food_japanese.push(true); break;
          //   case '양식': this.save_keys.tags_food_western.push(true); break;
          //   case '기타': this.save_keys.tags_food_etc.push(true); break;
          // }

          // 태그 - 맛 평가
          if ( !item.tags[1] ) {
            item.tags.push({text:'',type:'',color:''});
          }
          if ( item.tags[1].text === "Good" ) {
            this.save_keys.tags_taste_good.push(true);
          }
          else if ( item.tags[1].text !== "Good" ) {
            this.save_keys.tags_taste_good.push(false);            
          }
          if ( item.tags[1].text === "Soso" ) {
            this.save_keys.tags_taste_soso.push(true);
          }
          else if ( item.tags[1].text !== "Soso" ) {
            this.save_keys.tags_taste_soso.push(false);            
          }
          if ( item.tags[1].text === "Bad" ) {
            this.save_keys.tags_taste_bad.push(true);
          }
          else if ( item.tags[1].text !== "Bad" ) {
            this.save_keys.tags_taste_bad.push(false);            
          }
        });

      })
      .catch(error => {
        console.log(error);
      })
    },
  }
}
</script>


