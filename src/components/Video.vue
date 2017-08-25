<template lang="pug">
  .video-container
    video(autoplay, loop, muted)
      //- source(src="https://firebasestorage.googleapis.com/v0/b/foolog-7f6ae.appspot.com/o/food_video_origin_1.mp4?alt=media&token=4fc1045b-7c8c-4919-b0f0-d1e161486faf", type="video/mp4")
      source(src="https://firebasestorage.googleapis.com/v0/b/foolog-7f6ae.appspot.com/o/food_video.mp4?alt=media&token=65a8102f-f3a4-43e5-a1b3-9c0c8f67ce1a", type="video/mp4")
</template>

<script>
export default {
  name: 'Video',
}
</script>

<style lang="sass">
  video
    position: fixed
    top: 50%
    left: 50%
    min-width: 100%
    min-height: 100%
    width: auto
    height: auto
    z-index: -100
    transform: translate(-50%, -50%)
    background-size: cover
    background-position: center
</style>

