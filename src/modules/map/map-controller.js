export default class MapController {
  addMarker(position, map) {
    const marker = new google.maps.Marker({
      position: position,
      map: map
    });

    return marker;
  }
}