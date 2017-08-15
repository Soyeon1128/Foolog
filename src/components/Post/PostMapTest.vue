<template lang="pug">
  h3 My Google Maps Demo
  #map
    
</template>

<script>
export default {
  // name: 'google-map',
  // props: ['name'],
  data: () => {
    return {
    //   mapName: this.name + "-map",
    //   markerCoordinates: [{
    //     latitude: 51.501527,
    //     longitude: -0.1921837
    //   }, {
    //     latitude: 51.505874,
    //     longitude: -0.1838486
    //   }, {
    //     latitude: 51.4998973,
    //     longitude: -0.202432
    //   }],
    //   map: null,
    //   bounds: null,
    //   markers: []
    }
  },
  // mounted: () => {
  //   this.bounds = new google.maps.LatLngBounds();
  //   const element = document.getElementById(this.mapName)
  //   const mapCentre = this.markerCoordinates[0]
  //   const options = {
  //     center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
  //   }
  //   this.map = new google.maps.Map(element, options);
  //   this.markerCoordinates.forEach((coord) => {
  //     const position = new google.maps.LatLng(coord.latitude, coord.longitude);
  //     const marker = new google.maps.Marker({ 
  //       position,
  //       map: this.map
  //     });
  //   this.markers.push(marker)
  //     this.map.fitBounds(this.bounds.extend(position))
  //   });
  // },
  methods: {
    initMap() {
      var uluru = {lat: -25.363, lng: 131.044};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }
  }
};
</script>

<style lang="sass" scoped>

  #map 
    width: 100%
    height: 400px
    background-color: grey
  
</style>
