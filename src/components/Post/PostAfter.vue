<template lang="pug">
  .post-save-container.susy-photo-diary-wrapper
  
    .post-save-photo.susy-post-photo
      img(:src='save_keys.photo' v-if='save_keys.photo')
    
    .post-save-diary.susy-post-diary
      
      .post-save-diary-1
        span.fa.fa-clock-o.fa-lg  {{ postDate }}
        button.fa.fa-map-marker.fa-lg(type='button')  잠원동 신선횟집
      
      .post-save-diary-2
        .post-save-text {{ save_keys.text }}
      
      .post-save-diary-3   
        .save-tags-food
          span 음식 종류
          .tag-food(:class="{ 'tag-food-korean': save_keys.tags_food_korean, 'tag-food-chinese': save_keys.tags_food_chinese, 'tag-food-japanese': save_keys.tags_food_japanese, 'tag-food-eastern': save_keys.tags_food_eastern, 'tag-food-etc': save_keys.tags_food_etc }") {{ save_keys.tags_food }}
        .save-tags-taste
          span 맛 평가
          span.tag-taste.fa.fa-lg(:class="{ 'fa-smile-o': save_keys.tags_taste_good, 'fa-meh-o': save_keys.tags_taste_soso, 'fa-frown-o': save_keys.tags_taste_bad }")
        
        .save-share
          .fb-share-button(data-href='https://developers.facebook.com/docs/plugins/', data-layout='button', data-size='large', data-mobile-iframe='false')
            a.fb-xfbml-parse-ignore(target='_blank', href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse') 공유하기

        .save-modify
          span.fa.fa-pencil 
          button.modify-button 수정
      .post-save-delete
        button.delete-button(type='button') X
</template>

<script>
export default {
  name: 'PostAfter',
  created() {
    this.changeDateFormat();
    this.showSaveData();
  },
  data() {
    return {
      save_keys: {
        text: '',
        photo: '',
        tags_food: '',
        tags_food_korean: false,
        tags_food_chinese: false,
        tags_food_japanese: false,
        tags_food_eastern: false,
        tags_food_etc: false,
        tags_taste_good: false,
        tags_taste_soso: false,
        tags_taste_bad: false,
        date: '',
        longitude: '',
        latitude: '',
        memo: '',
        title: ''
      },
      postDate: '',
    }
  },
  methods: {
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
        console.log(response);
        console.log(response.data);
        // 이미지
        this.save_keys.photo = response.data[0].photo;
        // 텍스트
        this.save_keys.text = response.data[0].text;
        // 태그 - 음식 종류
        this.save_keys.tags_food = response.data[0].tags[0].text;
                
        if ( response.data[0].tags[0].text === "한식" ) {
          this.save_keys.tags_food_korean = true;
        }
        else if ( response.data[0].tags[0].text === "중식" ) {
          this.save_keys.tags_food_chinese = true;
        }
        else if ( response.data[0].tags[0].text === "일식" ) {
          this.save_keys.tags_food_japanese = true;
        }
        else if ( response.data[0].tags[0].text === "양식" ) {
          this.save_keys.tags_food_eastern = true;
        }
        else if ( response.data[0].tags[0].text === "기타" ) {
          this.save_keys.tags_food_etc = true;
        }
        // 태그 - 맛 평가
        if ( response.data[0].tags[1].text === "Good" ) {
          this.save_keys.tags_taste_good = true;
        }
        else if ( response.data[0].tags[1].text === "Soso" ) {
          this.save_keys.tags_taste_soso = true;
        }
        else if ( response.data[0].tags[1].text === "Bad" ) {
          this.save_keys.tags_taste_bad = true;
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
  }
}
</script>
