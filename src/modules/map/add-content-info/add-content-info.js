import PlacesService from "../../../services/places-service";

export default class PlaceContentWindow {
  constructor() {
    this.placesService = new PlacesService();
    this.recentMarker;
  }  

  addPlaceInfo(map, marker) {     
    const contentWindowElement = document.getElementById('add-content-info');
    const contentWindow = new google.maps.InfoWindow({
      content: contentWindowElement
    }); 

    document.getElementById('btn-save-place').addEventListener('click', (e) => {
      const save = this.saveMarker(marker.position);
      save.then(() => {
        contentWindow.close(map, marker);
      });

    });
    
    return contentWindow.open(map, marker);
  }

  async saveMarker(position) {
    const geometry = {
      lat: document.getElementById('place-lat').value,
      lng: document.getElementById('place-lng').value
    }

    const place = {  
      title: document.getElementById('place-label').value,    
      description: document.getElementById('place-description').value,
      geometry_lat: geometry.lat ? geometry.lat : position.lat(),
      geometry_lng: geometry.lng ? geometry.lng : position.lng(),
      is_favorite: document.getElementById('place-fav').checked,
      opening: document.getElementById('place-opening').value,
      closing: document.getElementById('place-closing').value
    }

    const postPlace = await this.placesService.postPlace(place);
    return postPlace;
  }
}