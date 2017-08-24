<template lang="pug">
transition(name='map')
  .map.susy-header
    .map-wrapper
      input(ref="input" id="pac-input" class="controls" type="text" placeholder="Search Box")
      #map(ref="mapBox")
      button.map-add-location(type='button' @click='placeName') 추 가
    .map-modal(@click='modalMap')

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PostMap',
  mounted() {   
    this.googleMap();
    console.log('this.googleMap():', this.googleMap());
  },
  data() {
    return {
      initMap: this.map, 
      initPosition: null,
      mapOptions: null,
      markers: [],
      place: {},
    };
  },
  methods: {
    ...mapMutations([
      'modalMap',
    ]),
    
    placeName () {
      this.$store.dispatch('placeName', this.place);
    },

    googleMap() {
      window.initMap = () => {  
        this.initPosition = new google.maps.LatLng(37.516271, 127.020171);      
        this.mapOptions = {
          zoom: 18,
          center: this.initPosition,
          // types: ['food']
        }
        this.map = new google.maps.Map(this.$refs.mapBox, this.mapOptions);
        google.maps.event.trigger(this.map, 'resize');
        this.setMarker();
        this.setSearchInput();
        // this.setLocationDetail();
      }
      window.toggleBounce = () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.DROP);
        }
      }
      window.initMap();
    },
    setMarker() {
      let marker = new google.maps.Marker({
        position: this.initPosition,
        title: 'Sinsa',
        draggable: true,
        animation: google.maps.Animation.DROP,
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

        let lat = places[0].geometry.location.lat()
        let lng = places[0].geometry.location.lng()
        
        if (places[0].name) { 
          this.place = {
            place_name: places[0].name,
            place_lat: lat,
            place_lng: lng
          }
        } 
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

.map-enter, .map-leave-top
  opacity: 0
.map-enter-active
  transition: opacity 0.7s ease

.map-area-container
  margin-top: 12%

</style>
      

     
      


      
