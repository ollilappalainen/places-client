import PlacesService from '../services/places-service';
import PlaceContentWindow from './add-content-info/add-content-info';
import ContentInfo from "./open-content-info/open-content-info";

export default class MapController {
  constructor() {  
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

  async loadMarkers(places, map) {       
    places = await places; 
    map = await map;
    let markers = [];   
    await places.map(async (pm) => {
      const contentWindow = new ContentInfo();
      const position = {lat: parseFloat(pm.place.geometry_lat), lng: parseFloat(pm.place.geometry_lng)};
      const marker = this.addMarker(position, map, pm.place.title, null, false);      
      marker.addListener('click', () => {
        contentWindow.openContentInfo(pm.place).open(map, marker);
      });
      
      markers.push(marker);
    });

    return markers;
  }

  async panToPlace(placeId, places, map) {
    const contentWindow = new ContentInfo(); 
    const pannedPlace = await places.map((pm) => {  
      if (parseInt(placeId) === parseInt(pm.place.id)) {
        const position = {lat: parseFloat(pm.place.geometry_lat), lng: parseFloat(pm.place.geometry_lng)};

        map.panTo(position);         
        contentWindow.openContentInfo(pm.place).open(map, pm.marker);
      }
    }); 
    
    return pannedPlace;
  }
}