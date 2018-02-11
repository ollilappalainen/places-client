class Map {
  initMap() {
    const hki = {lat: 60.192059, lng: 24.945831};
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: hki
    });
    const marker = new google.maps.Marker({
      position: hki,
      map: map
    });
  
    map.addListener('click', (e) => {
      addMarker(e.latLng, map);
    });
  }
  
  addMarker(latLng, map) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
    console.log(marker);
  }
  
  addMapToIndex() {
    const initMap = this.initMap();
    //const apiKey = process.env.GOOGLE_API_KEY;  
    const map = document.createElement('script');
    map.src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAub_fvMVVHw1VsW1XNpGpFOCtlktsxa6A&callback=initMap';
  
    document.getElementById('map').appendChild(map);
  }
}

export {
  Map
};