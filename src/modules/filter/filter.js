export default class Filter {
  filterPlacesAndMarkers(placesWithMarkers, filterByTitleEl, filterByOpenEl) {    
    const titleValue = filterByTitleEl.value;
    const openValue = filterByOpenEl.value;    
    let filteredPlaces;
  
    if (openValue === true) {
      filteredPlaces = this.filterOpen(placesWithMarkers);
      if (titleValue !== '' || titleValue !== null) {
        filteredPlaces = this.filterByTitle(filteredPlaces, titleValue);
      }
    } else {
      filteredPlaces = placesWithMarkers;
    }
    
    return filteredPlaces;
  }
  
  filterOpen (placesWithMarkers) {
    let filteredPlaces = [];
  
    filteredPlaces = placesWithMarkers.filter(pm => {
      const now = Date.now();
      const opening = this.parseTime(pm.place.opening);
      const closing = this.parseTime(pm.place.closing);
      return now > opening && now < closing; 
    });
  
    return filteredPlaces;
  }
  
  filterByTitle(placesWithMarkers, titleToSearch) {
    let filteredPlaces = [];
    
    filteredPlaces = placesWithMarkers.filter((pm) => {
      const searchValue = titleToSearch.toUpperCase().trim();
      const placeTitle = pm.place.title.toUpperCase().trim();
  
      return searchValue === placeTitle;
    });
  
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