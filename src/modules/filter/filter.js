export default class Filter {
  async filterPlacesAndMarkers(placesWithMarkers, filterByTitleEl, filterByOpenEl, filterFavEl) {    
    const titleValue = filterByTitleEl.value;
    const openValue = filterByOpenEl.checked; 
    const favVal = filterFavEl.checked;
    let filteredPlaces;

    switch (openValue) {
      case true:
        filteredPlaces = this.filterOpen(placesWithMarkers);
        if (titleValue !== '' || titleValue !== null) {
          filteredPlaces = this.filterByTitle(filteredPlaces, titleValue);
        }
        if (favVal) {
          filteredPlaces = await this.filterFavorites(filteredPlaces);
        }
        break;
      case false:
        filteredPlaces = await this.filterByTitle(placesWithMarkers, titleValue);
        if (favVal) {
          filteredPlaces = await this.filterFavorites(filteredPlaces);
        }
        break;
    }

    
    return filteredPlaces;
  }

  async filterFavorites(placesWithMarkers) {
    let filteredPlaces = [];
    const places = await placesWithMarkers;

    filteredPlaces = places.filter(pm => {
      return pm.place.is_favorite === true;
    });

    return filteredPlaces;
  }
  
  async filterOpen (placesWithMarkers) {
    let filteredPlaces = [];
    const places = await placesWithMarkers;

    filteredPlaces = places.filter(pm => {
      const now = Date.now();
      const opening = this.parseTime(pm.place.opening);
      const closing = this.parseTime(pm.place.closing);
      return now > opening && now < closing; 
    });
  
    return filteredPlaces;
  }
  
  async filterByTitle(placesWithMarkers, titleToSearch) {
    let filteredPlaces = [];
    const places = await placesWithMarkers;

    if (titleToSearch === null || titleToSearch === '') {
      filteredPlaces = await placesWithMarkers;      
    } else {
      filteredPlaces = places.filter((pm) => {
        const searchValue = titleToSearch.toUpperCase().trim();
        const placeTitle = pm.place.title.toUpperCase().trim();
    
        return placeTitle.includes(searchValue);
      });
    }    
  
    return filteredPlaces;
  }
  
  parseTime (time) {
    let parsedTime = new Date();
    const hours = time.slice(0, 2);
    const minutes = time.slice(3, 5);
    parsedTime.setHours(parseInt(hours));
    parsedTime.setMinutes(parseInt(minutes));
    
    return Date.parse(parsedTime);
  }
}