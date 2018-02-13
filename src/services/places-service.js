export default class PlacesService {
  constructor() {
    this.apiUrl = 'http://127.0.0.1:8000/api/';
  }

  async getPlaces() {
    const placesUrl = this.apiUrl + 'places';
    const response = await fetch(placesUrl);
    const places = await response.json();
    
    return places;
  }
}