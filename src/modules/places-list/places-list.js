import MapController from "../map-controller";

export default class PlacesList {
  constructor() { 
    this.mapController = new MapController();
  }

  /**
   * create elements for all places in the database that have passed filters
   * returns list of li -elements
   */
  async renderPlaces(places) {    
    places = await places;
    let elementList = document.createElement('ul');
    elementList.setAttribute('id', 'all-places-ul');

    /**
     * create list items, add element id = place database id, append class
     */
    places.map((item) => {
      let li = document.createElement('li');
      li.setAttribute('id', item.place.id);
      this.styleListLement(li);
      elementList.appendChild(li);
      const title = document.createTextNode(item.place.title);                        
      li.appendChild(title);
    });

    return elementList;
  }

  /**
   * Returns list with places with is_favorite value of 'true'
   */
  async filterFavorites(places) {
    places = await places;

    /** 
     * Check if place has is_facorite value of 'true'
    */
    const filteredPlaces = await places.filter((pm) => {      
      const isFav = pm.place.is_favorite;
      return isFav === true;
    });

    return filteredPlaces;    
  }

  /**
   * create elements for all places that have is_favorite value 'true'
   * returns a list of li -elements
   */
  async renderFavorites(places) {
    places = await places;
    let elementList = document.createElement('ul');
    elementList.setAttribute('id', 'favorites-ul');

    /** 
     * Check if place has is_favorite value of 'true'
    */
    const filteredPlaces = await this.filterFavorites(places);

    /**
     * create list items, add element id = place database id, append class
     */
    filteredPlaces.map((item) => {      
      let li = document.createElement('li');
      li.setAttribute('id', item.place.id);
      this.styleListLement(li);
      elementList.appendChild(li);
      const title = document.createTextNode(item.place.title);                        
      li.appendChild(title);
    });

    return elementList;
  }

  /**
   * Return element with 'side-menu-item' class added to classlist   
   */
  styleListLement(element) {
    const classList = element.classList;
    classList.add('side-menu-item');
    return element;
  }

  /**
   * Returns object with menu list element properties for all places and favorites
   */
  async renderSideMenu(menuElement, favElement, items, map) {
    let clickedElement;
    const itemsForRender = await items;
    const favoriteItems = await this.filterFavorites(items);
    const places = items;

    const menuElements =  await this.renderPlaces(items);
    menuElement.appendChild(menuElements);
    menuElement.addEventListener('click', (e) => {
      clickedElement = e.target;
      console.log(clickedElement);
      this.mapController.panToPlace(clickedElement.id, itemsForRender, map);
    });

    const favoriteElements = await this.renderFavorites(items);
    favElement.appendChild(favoriteElements);
    favElement.addEventListener('click', (e) => {
      clickedElement = e.target;
      this.mapController.panToPlace(clickedElement.id, favoriteItems, map);
    });

    const menu = {all: menuElements, favorites: favoriteElements};

    return menu;
  }
}