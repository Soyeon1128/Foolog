<template lang="pug">
  .map-wrapper.susy-main
    .map-dim
    input(ref="input" id="pac-input" class="controls" type="text" placeholder="Search Box")
    #map(ref="map")
</template>

<script>
export default {
  beforeMount () {
    
  },
  mounted() {
    window.initMap = () => {
          
      this.initPosition = new google.maps.LatLng(37.516271, 127.020171);      
      this.mapOptions = {
        zoom: 18,
        center: this.initPosition,
        // types: ['food']
      }
      this.map = new google.maps.Map(this.$refs.map, this.mapOptions);
      
      console.log('mapmap:', this.map)
      this.setMarker();
      this.setSearchInput();
      // this.setLocationDetail();
    }
    window.toggleBounce = () => {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
    
  },
  data() {
    return {
      map: null, 
      initPosition: null,
      mapOptions: null,
      markers: [],
    };
  },
  methods: {
    setMarker() {
      let marker = new google.maps.Marker({
        position: this.initPosition,
        title: 'Sinsa',
        draggable: true,
        animation: google.maps.Animation.BOUNCE,
      });
      marker.setMap(this.map)
      marker.addListener('click', toggleBounce);
    },
    setSearchInput() {
      let input = this.$refs.input
      let searchBox = new google.maps.places.SearchBox(input);
      console.log('map',this.map);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      this.map.addListener('bounds_changed', () => {
        searchBox.setBounds(this.map.getBounds());
      });
      searchBox.addListener('places_changed', () => {
        let places = searchBox.getPlaces();
        console.log(places);
        console.log(places[0].name);
        console.log(places[0].geometry.location.lat());
        console.log(places[0].geometry.location.lng());
        if (places.length == 0) {
          return;
        }
        this.markers.forEach( (marker) => {
          marker.setMap(null);
        });
        this.markers = [];

        let bounds = new google.maps.LatLngBounds();
        places.forEach( (place) => {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          let icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          this.markers.push(new google.maps.Marker({
            map: this.map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });

      console.log('searchBox:', searchBox);
    },
  },
}
</script>
  

<style lang="sass" scoped>
  
  
</style>
      

     
      


      
