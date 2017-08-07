<template lang="pug">
  .video-container
    video(autoplay, loop, muted)
      source(src="https://firebasestorage.googleapis.com/v0/b/foolog-7f6ae.appspot.com/o/food_video_origin_1.mp4?alt=media&token=4fc1045b-7c8c-4919-b0f0-d1e161486faf", type="video/mp4")
</template>

<script>
export default {
  name: 'Video',
  // computed: {
  //   videoSrc(){
  //     return require('https://firebasestorage.googleapis.com/v0/b/foolog-7f6ae.appspot.com/o/food_video_origin_1.mp4?alt=media&token=4fc1045b-7c8c-4919-b0f0-d1e161486faf')
  //   }
  // }
}
</script>

