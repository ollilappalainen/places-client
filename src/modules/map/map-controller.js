import PlacesService from '../../services/places-service';

export default class MapController {
  constructor() {
    this.placesService = new PlacesService();
  }

  addMarker(position, map, center) {
    const marker = new google.maps.Marker({
      position: position,
      map: map
    });

    center ? map.panTo(position) : null;    
    return marker;
  }

  async loadMarkers(places, map, center) {
    const markerPlaces = await places;
    if (markerPlaces.length > 0) {
      markerPlaces.map((place) => {
        console.log(place);
        const position = {lat: parseInt(place.geometry_lat), lng: parseInt(place.geometry_lng)};
        const marker = this.addMarker(position, map);
        return marker;
      });
    }
  }

  async saveMarker(position) {
    const place = {  
      title: 'Testi',    
      description: 'Testi',
      geometry_lat: position.lat,
      geometry_lng: position.lng,
      is_favorite: false,
      opening: '08:00:00',
      closing: '11:00:00'
    }

    const postPlace = await this.placesService.postPlace(place);
    console.log(postPlace);
    return postPlace;
  }
}