<template lang="pug">
transition(name="before")
  .before
    .post-list-container.susy-photo-diary-wrapper
      .post-list-photo.susy-post-photo
        .post-list-photo-wrapper
          form
            legend 포스트 사진 올리기
            fieldset
              label.post-add-label(for='post-add-photo')
                input(id='post-add-photo'
                name='post-add-photo'
                type='file'
                @change='imgUpload')
                span.fa.fa-camera(v-if="isCamera")
                span.add-photo-text 사진 추가하기
                .post-img-wrapper
                  img.post-img(
                    :src='postKeys.photo'
                    v-if='postKeys.photo')  
      .post-list-diary.susy-post-diary
        .post-list-diary-1
            span.fa.fa-calendar  {{ postDate }}
            button.fa.fa-map-marker.fa-lg(
              type='button'
              @click="modalMap")  {{ postKeys.location.title || " 장소 추가하기" }}
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
              input(type="radio" id="food-evaluate-korean" class="food-evaluate" value="한식" v-model='postKeys.tags[0].text')
              label.food-evaluate(for="food-evaluate-korean")
                span 한식
              input(type="radio" id="food-evaluate-chinese" class="food-evaluate" value="중식" v-model='postKeys.tags[0].text')
              label.food-evaluate(for="food-evaluate-chinese")
                span 중식
              input(type="radio" id="food-evaluate-japanese" class="food-evaluate" value="일식" v-model='postKeys.tags[0].text')
              label.food-evaluate(for="food-evaluate-japanese")
                span 일식
              input(type="radio" id="food-evaluate-western" class="food-evaluate" value="양식" v-model='postKeys.tags[0].text')
              label.food-evaluate(for="food-evaluate-western")
                span 양식
              input(type="radio" id="food-evaluate-etc" class="food-evaluate" value="기타" v-model='postKeys.tags[0].text')
              label.food-evaluate(for="food-evaluate-etc")
                span 기타
          .diary-tags-taste
            span 맛 평가
            .taste-evaluate-wrap
              input(type="radio" id="taste-evaluate-good" class="taste-evaluate" value='Good' v-model='postKeys.tags[1].text')
              label.taste-evaluate(for="taste-evaluate-good")
                span.fa.fa-smile-o
              input(type="radio" id="taste-evaluate-soso" class="taste-evaluate" value='Soso' v-model='postKeys.tags[1].text')
              label.taste-evaluate(for="taste-evaluate-soso")
                span.fa.fa-meh-o
              input(type="radio" id="taste-evaluate-bad" class="taste-evaluate" value='Bad' v-model='postKeys.tags[1].text')
              label.taste-evaluate(for="taste-evaluate-bad")
                span.fa.fa-frown-o
          .diary-save
            button.diary-save-button(@click="saveList") 저장
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
  data () {
    return {
      // isCamera: true
    }
  },
  computed: {
    ...mapGetters([
      'postKeys',
      'postDate',
      'isCamera',
      'isMap',
    ])
  },
  methods: {
    ...mapMutations([
      'changeDateFormat',
      'imgUpload',
      'showAllDayData',      
      'saveList',
      'imgUpload',
      // 'setPhoto'
      'modalMap',
    ]),
  }

}
</script>

