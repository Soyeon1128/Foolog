<template lang="pug">
  .post-list-container
    .post-list-photo.susy-post-photo
      .post-list-photo-wrapper
        span.fa.fa-camera
        form
          legend 포스트 사진 올리기
          fieldset
            label(for='post-add-photo')
              input(id='post-add-photo'
              name='post-add-photo'
              type='file'
              )
              span.add-photo-text 사진 추가하기
    .post-list-diary.susy-post-diary
      .post-list-diary-1
          span.fa.fa-clock-o.fa-lg  Aug 16 2017 Wed
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
              button.fa.fa-smile-o.fa-lg(type='button')
              button.fa.fa-smile-o.fa-lg(type='button')
              button.fa.fa-smile-o.fa-lg(type='button')
        .diary-tags-taste
          p 맛
            .taste-evaluate
              button.fa.fa-frown-o.fa-lg(type='button')
              button.fa.fa-frown-o.fa-lg(type='button')
              button.fa.fa-frown-o.fa-lg(type='button')
        .diary-save
          button.diary-save-button 저장
        //- .diary-share
        //-   span.fa.fa-facebook-official.fa-lg
        //-   | 페이스북 공유하기
        //- .diary-modify
        //-   span.fa.fa-pencil
        //-   | 수정
      .post-delete
        button.post-delete-button(type='button') X
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
