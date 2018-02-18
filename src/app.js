import './styles.less';
import PlacesService from "./services/places-service";
import Filter from './modules/filter/filter';
import PlacesList from "./modules/places-list/places-list";
import MapController from './modules/map-controller';

class App {
  constructor() {
    this.filter = new Filter();
    this.placesService = new PlacesService();  
    this.sideMenu = new PlacesList();  
    this.mapController = new MapController();
    this.menu = document.getElementById('all-places');
    this.favoritesMenu = document.getElementById('favorite-places');
    this.filterByTitle = document.getElementById('filter-by-title');
    this.filterByOpen = document.getElementById('filter-by-open');    
    this.map;
    this.placesWithMarkers = this.populatePlacesWithMarkers();
    this.filteredPlacesWithMarkers = this.filter.filterPlacesAndMarkers(this.placesWithMarkers, this.filterByTitle, this.filterByOpen);

    this.renderPage();
  }

  initMap() {
    const mapEl = document.getElementById('map');
    const options = {
      zoom: 14,
      center: {lat: 60.192059, lng: 24.945831}
    };

    this.map = new google.maps.Map(mapEl, options);

    this.map.addListener('click', (e) => {
      this.mapController.addMarker(e.latLng, this.map, null, null, true);      
    });
  }

  async populatePlacesWithMarkers(map) {
    let places = await this.placesService.getPlaces(); ;
    let placesWithMarkers = [];
    
    places.map((place) => {
      const marker = new google.maps.Marker({
        title: place.title,
        position: {lat: parseFloat(place.geometry_lat), lng: parseFloat(place.geometry_lng)},
        map: map
      });

      placesWithMarkers.push({
        place: place,
        marker: marker
      });
    });
    console.log('Places and markers: ', placesWithMarkers);
    return placesWithMarkers;
  }

  async renderPage() {    
    const menu = this.menu;
    const favMenu = this.favoritesMenu;
    const places = this.filteredPlacesWithMarkers;

    this.initMap(this.mapEl);
    const map = this.map;
    this.sideMenu.renderSideMenu(menu, favMenu, places, map);
    this.mapController.loadMarkers(places, map);
  }

  
}

new App();