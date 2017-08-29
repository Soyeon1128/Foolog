<template lang="pug">
  .video-container
    video(autoplay, loop, muted)
      source(src="https://firebasestorage.googleapis.com/v0/b/foolog-7f6ae.appspot.com/o/food_video.mp4?alt=media&token=65a8102f-f3a4-43e5-a1b3-9c0c8f67ce1a", type="video/mp4")
    img(src="../assets/Foolog-mobile-img.png" alt="푸로그 홈 이미지")
</template>

<script>
export default {
  name: 'Video',
}
</script>

<style lang="sass">

</style>

