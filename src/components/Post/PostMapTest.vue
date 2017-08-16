<template lang="pug">

    gmap-map(
    :center="center"
    :zoom="7"
    style="width: 500px; height: 300px")
  
    gmap-marker(
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position")

</template>

<script>
import Vue from 'vue';

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyBfPDw2aUTP2UBp3ZZ-A4sU7j5Uf-cj1UI',
//     v: '3.25',
//     libraries: 'places', //// If you need to use place input 
//   }
// });

export default {
  data () {
    return {
      // center: {lat: 37.516271, lng: 127.020171},
      // markers: [{
      //   position: {lat: 37.516271, lng: 127.020171}
      // }, {
      //   position: {lat: 37.516271, lng: 127.020171}
      // }]
    }
  }
}
</script>