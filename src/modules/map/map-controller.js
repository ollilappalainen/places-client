import PlacesService from '../../services/places-service';
import PlaceContentWindow from './add-content-info/add-content-info';
import ContentInfo from "./open-content-info/open-content-info";

export default class MapController {
  constructor() {
    this.placesService = new PlacesService();    
  }

  addMarker(position, map, label, description, isClicked) {
    const marker = new google.maps.Marker({
      title: label,
      position: position,
      map: map
    });

    if (isClicked) {
      const newContent = new PlaceContentWindow();
      map.panTo(position);
      newContent.addPlaceInfo(map, marker);
    }

    return marker;
  }

  async loadMarkers(places, map, center) {        
    const markerPlaces = await places;    
    await markerPlaces.map(async (place) => {
      const contentWindow = new ContentInfo();
      const position = {lat: parseFloat(place.geometry_lat), lng: parseFloat(place.geometry_lng)};
      const marker = this.addMarker(position, map, place.title, null, false);
      marker.addListener('click', () => {
        contentWindow.openContentInfo(place).open(map, marker);
      });

      return marker;
    });
  }
}