<template lang="pug">
  .spinner-container
    img(src="../assets/Spinner.gif")
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style lang="sass">
.spinner-container
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  z-index: 10000
</style>


