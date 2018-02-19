import PlacesService from "../../services/places-service";
import App from '../../app';

export default class PlaceContentWindow {
  constructor() {
    this.placesService = new PlacesService();
  } 
  
  loadContent(place) {
    console.log('asdasd', place);
    console.log(document.getElementById('place-label'));
    document.getElementById('place-label').value = place.title; 
    document.getElementById('place-description').value = place.description;
    document.getElementById('place-lat').value = place.geometry_lat;
    document.getElementById('place-lng').value = place.geometry_lng;      
    document.getElementById('place-fav').checked = place.is_favorite;
    document.getElementById('place-opening').value = place.opening;
    document.getElementById('place-closing').value = place.closing; 
  }

  updatePlaceInfo(map, placeWithMarker) {
    const self = this;
    const contentWindow = this.createContentInfo(); 
    const place = placeWithMarker.place;
    const marker = placeWithMarker.marker;
    const filterInput = document.getElementById('refresh-page');

    google.maps.event.addListener(contentWindow, 'domready', (e) => {
      this.loadContent(place);
      const saveBtn = document.getElementById('btn-save-place').addEventListener('click', (e) => {
        const update = self.updateMarker(place.id, marker.position);
        update.then(() => {
          contentWindow.close(map, marker);
          marker.setMap(null);
          marker.setMap(map);
          filterInput.click();
          console.log(filterInput);
          alert('Place saved successfully');
        });
      });

      const deleteBtn = document.getElementById('btn-delete-place');
      deleteBtn.addEventListener('click', () => {
        const deleteOpened = self.deletePlace(place.id);
        deleteOpened.then(() => {
          contentWindow.close();
          marker.setMap(null);
          filterInput.click();
          alert('Place deleted');
        });
      });
    });

    return contentWindow.open(map, marker);
  }

  triggerEvent(el, type){
    if ('createEvent' in document) {      
      const e = document.createEvent('HTMLEvents');
      e.initEvent(type, false, true);
      el.dispatchEvent(e);
    }
  }

  async deletePlace(id) {
    const deletePlace = await this.placesService.deletePlace(id);
    return deletePlace;
  }

  async updateMarker(id, position) {
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

    const updatePlace = await this.placesService.updatePlace(place, id);
    return updatePlace;
  }

  addPlaceInfo(map, marker) {  
    let saved = false;       
    let self = this;
    const contentWindow = this.createContentInfo(); 
    const filterInput = document.getElementById('refresh-page');
    
    google.maps.event.addListener(contentWindow, 'domready', (e) => { 
      const saveBtn = document.getElementById('btn-save-place').addEventListener('click', (e) => {
        const save = self.saveMarker(marker.position);
        save.then(() => {
          contentWindow.close(map, marker);
          saved = true;
          filterInput.click();
          alert('Place saved successfully');
        });
      });

      const deleteBtn = document.getElementById('btn-delete-place');
      deleteBtn.addEventListener('click', () => {
        contentWindow.close();
        marker.setMap(null);
      });
    });

    google.maps.event.addListener(contentWindow,'closeclick',function(){
      if (!saved) {
        marker.setMap(null);
      }    
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
    const contentHtml = `<div id="add-content-info" class="content-info-wrapper">
      <div class="content-info-header header">
        <h2 id="info-box-label">PLACE INFO</h2>
      </div>         
      <div class="content-info-label">
        <p>Label:</p>
        <input id="place-label" class="content-info-input input-width-350" type="text" name="place-label">
      </div>
      <div class="content-info-desc">
        <p>Description:</p>
        <textarea id="place-description" class="content-info-input input-width-350" type="text" name="place-description" rows="5"></textarea>
      </div>
      <div class="content-info-hours">
        <div>
          <p>Opens:</p>
          <input id="place-opening" class="content-info-input" type="time" name="place-opens">
        </div>          
        <div>
          <p>Closes:</p>
          <input id="place-closing" class="content-info-input" type="time" name="place-closes">
        </div>          
      </div>
      <div class="content-info-geo">
        <div>
          <p>Latitude:</p>  
          <input id="place-lat" class="content-info-input" type="number" name="place-lat">
        <div>
          <p>Longitude:</p>
          <input id="place-lng" class="content-info-input" type="number" name="place-lng">  
        </div>                    
      </div>
      <div class="content-info-fav">
        <div>
          <p>Add to favorites:</p>
        </div>
        <div>
          <input id="place-fav" class="check-box" type="checkbox">
        </div>                    
      </div>
      <div class="content-info-buttons">
          <button id="btn-save-place">Save</button>
          <button id="btn-delete-place">Delete</button>
      </div>
    </div>`;

    const contentWindow = new google.maps.InfoWindow({
      content: contentHtml
    });

    return contentWindow;
  }
}