<template lang="pug">
  .post-list-container.susy-photo-diary-wrapper
    .post-list-photo.susy-post-photo
      .post-list-photo-wrapper
        span.fa.fa-camera
        form
          legend 포스트 사진 올리기
          fieldset
            label.post-add-label(for='post-add-photo')
              input(id='post-add-photo'
              name='post-add-photo'
              type='file'
              @change='imgUpload')
              span.add-photo-text 사진 추가하기
              .post-img-wrapper
                img.post-img(
                  :src='post_keys.photo'
                  v-if='post_keys.photo')
    .post-list-diary.susy-post-diary
      .post-list-diary-1
          span.fa.fa-clock-o.fa-lg  {{ postDate }}
          //- span.fa.fa-clock-o.fa-lg  {{ this.$store.state.get_date }}
          button.fa.fa-map-marker.fa-lg(type='button')  장소 추가하기
      .post-list-diary-2
        form
          textarea.post-add-text(
                type='text'
                name='add-text'
                cols='60'
                rows='12'
                wrap='hard'
                v-model='post_keys.text'
                autofocus)
      .post-list-diary-3      
        .diary-tags-food
          span 음식 종류
          //- .food-evaluate
          //-   button.food-evaluate-korean(type='button'  value='한식') 한식
          //-   button.food-evaluate-chinese(type='button' value='중식') 중식
          //-   button.food-evaluate-japanese(type='button' value='일식') 일식
          //-   button.food-evaluate-eastern(type='button' value='양식') 양식
          //-   button.food-evaluate-etc(type='button' value='기타') 기타
          .food-evaluate-wrap
            input(type="radio" id="food-evaluate-korean" name="food-evaluate" class="food-evaluate" )
            label.food-evaluate(@click='getFoodTagValue' value='한식' for="food-evaluate-korean")
              span(value='한식') 한식 
            input(type="radio" id="food-evaluate-chinese" name="food-evaluate" class="food-evaluate")
            label.food-evaluate(@click='getFoodTagValue' value='중식' for="food-evaluate-chinese")
              span(value='중식') 중식
            input(type="radio" id="food-evaluate-japanese" name="food-evaluate" class="food-evaluate")
            label.food-evaluate(@click='getFoodTagValue' value='일식' for="food-evaluate-japanese")
              span(value='일식') 일식
            input(type="radio" id="food-evaluate-eastern" name="food-evaluate" class="food-evaluate")
            label.food-evaluate(@click='getFoodTagValue' value='양식' for="food-evaluate-eastern")
              span(value='양식') 양식
            input(type="radio" id="food-evaluate-etc" name="food-evaluate" class="food-evaluate")
            label.food-evaluate(@click='getFoodTagValue' value='기타' for="food-evaluate-etc")
              span(value='기타') 기타
        .diary-tags-taste
          span 맛 평가
          //- .taste-evaluate
          //-   button.fa.fa-smile-o.fa-lg(type='button')
          //-   button.fa.fa-meh-o.fa-lg(type='button')
          //-   button.fa.fa-frown-o.fa-lg(type='button')
          .taste-evaluate-wrap
            input(type="radio" id="taste-evaluate-good" name="taste-evaluate" class="taste-evaluate" )
            label.taste-evaluate(@click='getTasteTagValue' value='Good' for="taste-evaluate-good")
              span.fa.fa-smile-o(value='Good')
            input(type="radio" id="taste-evaluate-soso" name="taste-evaluate" class="taste-evaluate")
            label.taste-evaluate(@click='getTasteTagValue' value='Soso' for="taste-evaluate-soso")
              span.fa.fa-meh-o(value='Soso')
            input(type="radio" id="taste-evaluate-bad" name="taste-evaluate" class="taste-evaluate")
            label.taste-evaluate(@click='getTasteTagValue' value='Bad' for="taste-evaluate-bad")
              span.fa.fa-frown-o(value='Bad')
        .diary-save
          button.diary-save-button(@click='savePost') 저장
      .post-delete
        button.post-delete-button(
          type='button'
          @click='closeBeforeSaveList') X
</template>

<script>
import {mapGetters} from 'vuex' 
import {mapMutations} from 'vuex'

export default {
  name: 'PostBeforeSave',
  data () {
    return {
      post_keys: {
        text: '',
        photo: '',
        tags_food: '',
        tags_taste: '',
        date: '',
        longitude: '',
        latitude: '',
        memo: '',
        title: ''
      },
      file: null,
      postDate: ''
    }
  },
  created() {
    this.changeDateFormat();
  },
  computed: {
    ...mapGetters([
      'postBeforeSave',
    ])
  },
  methods: {
    ...mapMutations([
      'closeBeforeSaveList'
    ]),
    imgUpload(e) {
      // console.log(e)
      // console.log(e.target)
      // console.log(e.target.files[0])
      this.file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (f) => {
        console.log(f);
        this.post_keys.photo = f.srcElement.result; 
      }
    },
    getFoodTagValue(e) {
      let value = e.target.attributes[0].value
      console.log(e.target.attributes[0].value);
      
      this.post_keys.tags_food = value
    },
    getTasteTagValue(e) {
      let value = e.target.attributes[0].value
      console.log(e.target.attributes[0].value);
      
      this.post_keys.tags_taste = value      
    },
    // 날짜 형식 변환 함수
    // 전달받은 YYYYMMDD 형식의 날짜를 필요한 날짜 형식으로 변환시키는 함수
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

      // dataDate : 데이터 전송 시 필요한 날짜 형식 (YYYY-MM-DD 00:00)
      let dataDate = year + '-' + month + '-' + date + ' ' + '00:00'
      this.post_keys.date = dataDate;
    },
    savePost() {
      let form = new FormData();
      if ( this.post_keys.text.trim() !== '' ) {
        form.append('text', this.post_keys.text);
      }
      if ( this.file ) {
        form.append('photo', this.file);
      }
      if ( this.post_keys.tags_food && this.post_keys.tags_taste.trim() !== '' ) {
        form.append('tags', this.post_keys.tags_food+', '+this.post_keys.tags_taste);
      }
      if ( this.post_keys.date ) {
        form.append('date', this.post_keys.date);
      }
      if ( this.post_keys.longitude ) {
        form.append('longitude', this.post_keys.longitude);
      }
      if ( this.post_keys.latitude ) {
        form.append('latitude', this.post_keys.latitude);
      }
      if ( this.post_keys.memo.trim() !== '' ) {
        form.append('memo', this.post_keys.memo);
      }
      if ( this.post_keys.title.trim() !== '' ) {
        form.append('title', this.post_keys.title);
      }
      let user_token = window.localStorage.getItem('token');
      console.log(this.$store.state.url_post);
      this.$http.post(this.$store.state.url_post, form, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(res => {
        console.log(res)
        console.log(res.data)
        window.alert('일기가 등록되었습니다.')
      })
      .catch(err => {
        console.log(err)
        console.log(err.response)
      })
    }
  }
}
</script>
