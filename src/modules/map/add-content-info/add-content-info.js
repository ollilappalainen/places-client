import PlacesService from "../../../services/places-service";

export default class PlaceContentWindow {
  constructor() {
    this.placesService = new PlacesService();
    this.recentMarker;
  }  

  addPlaceInfo(map, marker) {         
    const contentWindow = this.createContentInfo(); 

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

  createContentInfo() {
    const contentHtml = '<div id="add-content-info" class="content-info-wrapper">'
      +'<div class="content-info-header header">'
        +'<h2 class="label">Add place information</h2>'
      +'</div>'         
      +'<div class="content-info-label">'
        +'<p>Label:</p>'
        +'<input id="place-label" class="content-info-input input-width-350" type="text" name="place-label">'
      +'</div>'
      +'<div class="content-info-desc">'
        +'<p>Description:</p>'
        +'<textarea id="place-description" class="content-info-input input-width-350" type="text" name="place-description" rows="5"></textarea>'
      +'</div>'
      +'<div class="content-info-hours">'
        +'<div>'
          +'<p>Opens:</p>'
          +'<input id="place-opening" class="content-info-input" type="time" name="place-opens">'
        +'</div>'          
        +'<div>'
          +'<p>Closes:</p>'
          +'<input id="place-closing" class="content-info-input" type="time" name="place-closes">'
        +'</div>'          
      +'</div>'
      +'<div class="content-info-geo">'
        +'<div>'
          +'<p>Latitude:</p>'  
          +'<input id="place-lat" class="content-info-input" type="number" name="place-lat">'
        +'<div>'
          +'<p>Longitude:</p>'
          +'<input id="place-lng" class="content-info-input" type="number" name="place-lng">'  
        +'</div>'                    
      +'</div>'
      +'<div class="content-info-fav">'
        +'<div>'
          +'<p>Add to favorites:</p>'
        +'</div>'
        +'<div>'
          +'<input id="place-fav" type="checkbox">'
        +'</div>'                    
      +'</div>'
      +'<div class="content-info-buttons">'
          +'<button id="btn-save-place">Save</button>'
          +'<button id="btn-delete-place">Delete</button>'
      +'</div>'
    +'</div>';

    const contentWindow = new google.maps.InfoWindow({
      content: contentHtml
    });

    return contentWindow;
  }
}