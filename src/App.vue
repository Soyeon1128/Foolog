<template lang="pug">
  #app
    .box.is-1
    .box.is-2
    .box.is-3
    .box.is-4
    .box.is-5
    .box.is-6
    .box.is-7
    .box.is-8
    .box.is-9
    .box.is-10
    .box.is-11
    .box.is-12
   
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style lang="sass">

@import "~config"

// body
//   margin: 0
//   padding: 0
//   width: 100%
// #app
//   margin: 0 15%
//   padding: 0
//   // width: 100%
//   display: flex
//   align-items: center
//   justify-content: center
.box
  // margin: 0 50px
  width: 100%
  height: 100vh
  &.is-1
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-2
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-3
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-4
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-5
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-6
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-7
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-8
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-9
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-10
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-11
    +span(1)
    background: rgba(50, 80, 180, 0.3)
  &.is-12
    +span(1)
    background: rgba(50, 80, 180, 0.3)

</style>
