export default class PlacesService {
  constructor() {
    this.apiUrl = 'http://127.0.0.1:8000/api/';
    //this.apiUrl = 'https://places-app-phpapi.herokuapp.com/api/';
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
  }

  async deletePlace(id) {
    const deleteUrl = this.apiUrl + 'places/' + id;
    const response = await fetch(deleteUrl, {method: 'DELETE'})
      .then((res) => {
        return res;
      });
  }

  async updatePlace(place, id) {
    const updateUrl = this.apiUrl + 'places/' + id;
    const response = await fetch(updateUrl, {
      method: 'PUT',
      body: JSON.stringify(place),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res;
    }).then((data) => {
      console.log(data);
    });
  }
}