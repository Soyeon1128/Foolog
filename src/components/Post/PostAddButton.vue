<template lang="pug">
  .post-add-button-container
      button.add-button.susy-add-button(
        type='button'
        @click='openPostBefore')
        span.add-button-plus +
        span.add-button-write 일기 쓰기
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'PostAddButton',

  methods: {
    ...mapMutations([
      'openPostBefore',
      
    ])
  }
}
</script>
