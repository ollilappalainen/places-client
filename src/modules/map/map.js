import MapController from './map-controller';
import PlacesService from '../../services/places-service';

export default class Map {  
  constructor() {
    this.mapController = new MapController();
    this.placesService = new PlacesService();
    this.places = this.placesService.getPlaces();
  }  

  initMap() {
    const hki = {lat: 60.192059, lng: 24.945831};
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: hki
    });

    map.addListener('click', (e) => {
      this.mapController.addMarker(e.latLng, map, true);
      this.mapController.saveMarker(e.latLng);
      console.log(e);
    });

    this.mapController.loadMarkers(this.places, map, false);
  }
}