export default class PlacesService {
  constructor() {
    this.apiUrl = 'https://places-app-phpapi.herokuapp.com/api/';
  }

  async getPlaces() {
    const placesUrl = this.apiUrl + 'places';
    const response = await fetch(placesUrl);
    const places = await response.json();
    
    return places;
  }

  async postPlace(place) {
    const postUrl = this.apiUrl + 'places';
    const response = await fetch(postUrl, {
      method: 'POST',
      body: JSON.stringify(place),
      headers: {"Content-Type": "application/json"}
    }).then(function(res){
      return res.json();
    }).then(function(data){
      console.log(data);
    });
    
    return response;
  }
}