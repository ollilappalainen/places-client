import './styles.less';
import PlacesService from "./services/places-service";
import Filter from './modules/filter/filter';
import PlacesList from "./modules/places-list/places-list";
import MapController from './modules/map-controller';

export default class App {
  constructor() {
    this.filter = new Filter();
    this.placesService = new PlacesService();  
    this.sideMenu = new PlacesList();  
    this.mapController = new MapController();
    this.menu = document.getElementById('all-places');
    this.favoritesMenu = document.getElementById('favorite-places');
    this.filterByTitle = document.getElementById('filter-by-title');
    this.filterByOpen = document.getElementById('filter-by-open');  
    this.filterFav = document.getElementById('filter-favorites');  
    this.map;
    this.placesWithMarkers = this.populatePlacesWithMarkers();
    this.filteredPlacesWithMarkers = this.filter.filterPlacesAndMarkers(this.placesWithMarkers, this.filterByTitle, this.filterByOpen, this.filterFav);

    this.renderPage();
  }

  initMap() {
    const mapEl = document.getElementById('map');
    const options = {
      zoom: 8,
      center: {lat: 60.192059, lng: 24.945831}
    };

    this.map = new google.maps.Map(mapEl, options);

    this.map.addListener('click', (e) => {
      this.mapController.addMarker(e.latLng, this.map, null);      
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
    this.handleSearchPress();
    this.mapController.loadMarkers(places, map);
  }

  handleSearchPress() {
    let keyPress = document.getElementById('filter-by-title');
    keyPress.addEventListener('keyup', (e) => {
      this.reloadMakers(false);
    });

    let openPress = document.getElementById('filter-by-open');
    openPress.addEventListener('change', (e) => {
      this.reloadMakers(false);
    });

    let favoritesPress = document.getElementById('filter-favorites');
    favoritesPress.addEventListener('change', (e) => {
      this.reloadMakers(false);
    });

    let refreshBtn = document.getElementById('refresh-page');
    refreshBtn.addEventListener('click', (e) => {
      this.reloadMakers(true);
    });
  }

  async reloadMakers(ifPlaceUpdated) {    
    const map = this.map;
    const menu = this.menu;
    const favMenu = this.favoritesMenu; 
    const filterByTitle = document.getElementById('filter-by-title');
    const filterByOpen = document.getElementById('filter-by-open');   
    const filterFavorites = document.getElementById('filter-favorites'); 
    this.placesWithMarkers = ifPlaceUpdated ? this.populatePlacesWithMarkers(map) : this.placesWithMarkers;  
    const places = await this.placesWithMarkers;
    const filteredPlaces = await this.filter.filterPlacesAndMarkers(places, filterByTitle, filterByOpen, filterFavorites); 
    console.log(filteredPlaces);   
    this.mapController.removeMarkers(places);
    let favorites = document.getElementById('favorites-ul');
    let allPlaces = document.getElementById('all-places-ul');
    favorites.remove();
    allPlaces.remove();

    this.sideMenu.renderSideMenu(menu, favMenu, filteredPlaces, map);
    this.mapController.loadMarkers(filteredPlaces, map);
  } 
}

new App();