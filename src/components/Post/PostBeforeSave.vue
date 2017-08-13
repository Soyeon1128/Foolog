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
          span.fa.fa-clock-o.fa-lg  {{ this.$route.params.date }}
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
              span.fa.fa-smile-o.fa-lg(value='Good')
            input(type="radio" id="taste-evaluate-soso" name="taste-evaluate" class="taste-evaluate")
            label.taste-evaluate(@click='getTasteTagValue' value='Soso' for="taste-evaluate-soso")
              span.fa.fa-meh-o.fa-lg(value='Soso')
            input(type="radio" id="taste-evaluate-bad" name="taste-evaluate" class="taste-evaluate")
            label.taste-evaluate(@click='getTasteTagValue' value='Bad' for="taste-evaluate-bad")
              span.fa.fa-frown-o.fa-lg(value='Bad')
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
        location: '',
        tags_food: '',
        tags_taste: '',
      }      
    }
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
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (f) => {
        console.log(f);
        console.log(this.post_keys.photo);
        
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
    savePost() {
      console.log(this.post_keys.photo);
      console.log(this.post_keys.text);
      console.log(this.post_keys.tags_food);
      console.log(this.$route.params.date);

      let user_token = window.localStorage.getItem('token');
      this.$http.get(this.dayListUrl, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      this.$http.post(this.$store.state.url_post, {
        text: this.post_keys.text,
        photo: this.post_keys.photo,
        tags: this.post_keys.tags_food,
        date: this.$route.params.date,
        longitude: '',
        latitude: '',
        memo: '',
        title: '',
      })
      .then(res => {
        console.log(res)
        window.alert('일기가 등록되었습니다.')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
