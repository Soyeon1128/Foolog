<template lang="pug">
transition(name="empty")
  .post-empty-container.susy-main
    .post-empty
      p.post-empty-group-1
        span.double-quotes-start.fa.fa-quote-left.fa-4x
        span.post-empty-text-1 아직 등록된 
        span.post-empty-highlight 일기
        span.post-empty-text-2 가 없습니다
      p.post-empty-group-2
        span.post-empty-text-3 나만의 맛있는 일기를 작성해 보세요
        span.double-quotes-end.fa.fa-quote-right.fa-4x
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'PostEmpty',
  computed: {
    ...mapGetters([
    ])
  },
}
</script>


   