<template lang="pug">
  .post-add-button-container
      button.add-button.susy-add-button(
        type='button'
        @click="writeDiary")
        span.add-button-plus +
        span.add-button-write 일기 쓰기
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'PostAddButton',
  methods: {
    ...mapActions(['writeDiary']),
  }
}
</script>
