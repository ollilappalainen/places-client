import PlacesService from '../services/places-service';
import PlaceContentWindow from './add-content-info/add-content-info';

export default class MapController {
  constructor() {  
  }

  addMarker(position, map, label) {
    const marker = new google.maps.Marker({
      title: label,
      position: position,
      map: map
    });

    const newContent = new PlaceContentWindow();
    map.panTo(position);
    newContent.addPlaceInfo(map, marker);
    
    return marker;
  }

  async loadMarkers(places, map) {       
    places = await places; 
    map = await map;
    let markers = [];   
    await places.map(async (pm) => {
      const contentWindow = new PlaceContentWindow();
      const position = {lat: parseFloat(pm.place.geometry_lat), lng: parseFloat(pm.place.geometry_lng)};                 
      
      pm.marker.addListener('click', () => {
        contentWindow.updatePlaceInfo(map, pm);      
      });

      const waitToLookCool = Math.floor((Math.random() * 400) + 100);
      setTimeout(() => {
        const marker = pm.marker.setMap(map);
        markers.push(marker);
      }, waitToLookCool);            
    });

    return markers;
  }

  async removeMarkers(places) {
    places = await places;
    places.map((pm) => {
      pm.marker.setMap(null);
    });
  }

  async panToPlace(placeId, places, map) {    
    const pannedPlace = await places.map((pm) => {  
      if (parseInt(placeId) === parseInt(pm.place.id)) {
        const position = {lat: parseFloat(pm.place.geometry_lat), lng: parseFloat(pm.place.geometry_lng)};

        map.panTo(position);         
        const contentWindow = new PlaceContentWindow(); 
        contentWindow.updatePlaceInfo(map, pm);
      }
    }); 
    
    return pannedPlace;
  }
}