import './styles.less';
//import Map from './modules/map';

class Map {
  constructor(dom, options) {
    google.maps.event.addDomListener(window, "load", this.initialize);
    this.initMap(dom, options);
  }

  initMap(dom, options) {
    this.map = new google.maps.Map(dom, options);
  }

  addMarker(latLng, map) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
    console.log(marker);
  }

  static main() {
    const map = new Map(document.getElementById('map'), {
      zoom: 14,
      center: new google.maps.LatLng(60.7751, 25.19)
    });

    const marker = new google.maps.Marker({
      position: hki,
      map: map
    });

    map.addListener('click', (e) => {
      addMarker(e.latLng, map);
    });
  }
}

Map.main();