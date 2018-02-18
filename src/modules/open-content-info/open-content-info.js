import PlacesService from '../../services/places-service';

export default class ContentInfo {
  constructor() {
    this.placesService = new PlacesService();
  }

  openContentInfo(place) {
    const infoWindow = this.createInfoWindow();
    const self = this;

    google.maps.event.addListener(infoWindow, 'domready', function() {
      document.getElementById('show-place-label').innerHTML = place.title; 
      document.getElementById('show-place-desc').innerHTML = place.description;
      document.getElementById('show-place-lat').innerHTML = place.geometry_lat;
      document.getElementById('show-place-lng').innerHTML = place.geometry_lng;      
      document.getElementById('show-place-fav').checked = place.is_favorite;
      document.getElementById('show-place-opening').innerHTML = place.opening;
      document.getElementById('show-place-closing').innerHTML = place.closing; 

      const deleteBtn = document.getElementById('btn-place-delete');
      deleteBtn.addEventListener('click', () => {
        const deleteOpened = self.deletePlace(place.id);
        deleteOpened.then(() => {
          infoWindow.close();
          alert('Place deleted');
        });
      });
    });

    return infoWindow;
  }

  createInfoWindow() {
    const content = `<div id="show-content-info" class="show-content-info-wrapper">
      <div class="show-content-info-label">
        <h2 id="show-place-label"></h2>
      </div>
      <div class="show-content-info-hours">
        <div><p class="content-label">Open</p></div>
        <div>
          <p id="show-place-opening"></p>
        </div>
        <div><p>-</p></div>
        <div>
          <p id="show-place-closing"></p>
        </div>
      </div>   
      <div class="show-content-info-geo">
        <div>
          <p class="content-label">Latitude, Longitude:</p>
        </div>
        <div>          
          <p id="show-place-lat"></p>
        </div>
        <div>          
          <p id="show-place-lng"></p>
        </div>
      </div>
      <div class="show-content-info-desc">
        <p id="show-place-desc"></p>
      </div>
      <div class="show-content-info-fav">
        <div>
        <p class="content-label">Favorite:</p>
        </div>
        <div>
          <input id="show-place-fav" type="checkbox" disabled>
        </div>
      </div>     
      <div class="show-content-info-buttons">
        <button id="btn-place-edit">Edit</button>
        <button id="btn-place-delete">Delete</button>
      </div>
    </div>`;

    const infoWindow = new google.maps.InfoWindow({
      content: content
    });

    return infoWindow;
  }

  async deletePlace(id) {
    const deletePlace = await this.placesService.deletePlace(id);
    return deletePlace;
  }
}