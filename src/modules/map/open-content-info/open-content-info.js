export default class ContentInfo {
  constructor() { }

  openContentInfo(map, marker, place) {

    document.getElementById('show-place-label').innerHTML = place.title; 
    document.getElementById('show-place-desc').innerHTML = place.description;
    document.getElementById('show-place-lat').innerHTML = place.geometry_lat;
    document.getElementById('show-place-lng').innerHTML = place.geometry_lng;      
    document.getElementById('show-place-fav').checked = place.is_favorite;
    document.getElementById('show-place-opening').innerHTML = place.opening;
    document.getElementById('show-place-closing').innerHTML = place.closing; 

    const content = document.getElementById('show-content-info');
    const infoWindow = new google.maps.InfoWindow({
      content: content
    }); 
    
    return infoWindow.open(map, marker);
  }
}