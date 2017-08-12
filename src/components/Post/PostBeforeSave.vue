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
                  :src='src'
                  v-if='src')
    .post-list-diary.susy-post-diary
      .post-list-diary-1
          span.fa.fa-clock-o.fa-lg  {{ this.$route.params.date }}
          button.fa.fa-map-marker.fa-lg(type='button')  장소 추가하기
      .post-list-diary-2
        form
          textarea.post-add-text(
                type='text'
                name='add-text'
                cols='60'
                rows='12'
                wrap='hard'
                autofocus)
      .post-list-diary-3      
        .diary-tags-food
          p 음식 종류
          .food-evaluate
            button.food-evaluate-korean(type='button') 한식
            button.food-evaluate-chinese(type='button') 중식
            button.food-evaluate-japanese(type='button') 일식
            button.food-evaluate-eastern(type='button') 양식
            button.food-evaluate-etc(type='button') 기타
        .diary-tags-taste
          span 맛 평가
          .taste-evaluate
            button.fa.fa-smile-o.fa-lg(type='button')
            button.fa.fa-meh-o.fa-lg(type='button')
            button.fa.fa-frown-o.fa-lg(type='button')
        .diary-save
          button.diary-save-button 저장
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
      src: '',
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

       this.src = f.srcElement.result; 

      }
    }
  }
}
</script>
