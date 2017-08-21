<template lang="pug">
.post-after
  .post-save-container.susy-photo-diary-wrapper(v-for="(item, index) in allDayData")
    .post-save-photo.susy-post-photo
      .post-save-photo-wrapper
        img(:src="item.photo")
    .post-save-diary.susy-post-diary
      .post-save-diary-1
        span.fa.fa-clock-o.fa-lg  {{ postDate }}
        button.fa.fa-map-marker.fa-lg(type='button')  잠원동 신선횟집
      .post-save-diary-2
        .post-save-text {{ item.text }}
      .post-save-diary-3   
        .save-tags-food
          span 음식 종류
          .tag-food(v-if="item.tags[0]" :style="{'background': item.tags[0].color}") {{ item.tags[0].text }}
        .save-tags-taste
          span 맛 평가
          span.tag-taste.fa.fa-lg(v-if="item.tags[1]" :class="assignTasteClass(item.tags[1].text)")
        .save-modify
          span.fa.fa-pencil 
          button.modify-button(@click="modifyList(index)" type="button") 수정
      .post-save-delete
        button.delete-button(@click="deleteList(index)" type='button') X
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'PostAfter',
  created() {
    this.changeDateFormat(this.$route.params.date); 
    this.showAllDayData();
  },
  computed: {
    ...mapGetters([
      'allDayData',
      'postDate',
    ])
  },
  methods: {
    ...mapMutations([
      'changeDateFormat',
      'showAllDayData',
      'modifyList',
      'deleteList',                  
    ]),
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
