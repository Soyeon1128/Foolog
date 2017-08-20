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
                  :src='postKeys.photo'
                  v-if='postKeys.photo')
    .post-list-diary.susy-post-diary
      .post-list-diary-1
          span.fa.fa-clock-o.fa-lg  {{ postDate }}
          button.fa.fa-map-marker.fa-lg(type='button')  장소 추가하기
      .post-list-diary-2
        form
          textarea.post-add-text(
                type='text'
                name='add-text'
                cols='60'
                rows='12'
                wrap='hard'
                v-model='postKeys.text'
                autofocus)
      .post-list-diary-3      
        .diary-tags-food
          span 음식 종류
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
          button.diary-save-button(@click="postList") 저장
      .post-delete
        button.post-delete-button(
          type='button'
          @click="showAllDayData($route.params.date)") X
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'PostBefore',
  created() {
    this.changeDateFormat(this.$route.params.date);    
  },
  computed: {
    ...mapGetters([
      'postKeys',
      'postDate',
    ])
  },
  methods: {
    ...mapMutations([
      'changeDateFormat',
      'imgUpload',
      'getFoodTagValue',
      'getTasteTagValue',
      'showAllDayData',      
      'postList',
    ]),
    ...mapActions([
    ])
  }

}
</script>

