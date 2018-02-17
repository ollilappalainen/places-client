export default class PlacesList {
  constructor() { }

  async renderPlaces(places) {
    let blocks;
    await places;
    console.log(places);
    await places.map((place) => {
      const block = document.createElement('div');
      const title = document.createTextNode(place.title);                        
      block.appendChild(title);
      blocks.push(block);
    });
    console.log(blocks);
    return blocks;
  }

}