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
        const position = {lat: parseInt(place.geometry_lat), lng: parseInt(place.geometry_lng)};
        const marker = this.addMarker(position, map);
        return marker;
      });
    }
  }
}