import MapController from './map-controller';
import PlacesService from '../../services/places-service';
import PlacesList from "./places-list/places-list";

export default class Map {  
  constructor() {
    this.mapController = new MapController();
    this.placesService = new PlacesService();
    this.placesList = new PlacesList();
    this.places = this.placesService.getPlaces();
    this.sideMenu = document.getElementById('all-places');
    //this.renderSideMenuItems(this.sideMenu, this.places);
  }  

  initMap() {
    const hki = {lat: 60.192059, lng: 24.945831};
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: hki
    });

    map.addListener('click', (e) => {
      this.mapController.addMarker(e.latLng, map, null, null, true);      
    });

    this.mapController.loadMarkers(this.places, map, false);
  }

  // async renderSideMenuItems(element, items) {
  //   const itemsForRender = await items;
  //   const menuElements = this.placesList.renderPlaces(itemsForRender);
  //   menuElements.map((menuElement) => {
  //     element.appendChild(menuElement);
  //   });
  // }
}