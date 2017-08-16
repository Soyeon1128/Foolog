<template lang="pug">
  #map
</template>

<script>
export default {
  methods: {
      initMap() {
      var map;
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.516271, lng: 127.020171},
        zoom: 8
      });
    }
  }
}
</script>

