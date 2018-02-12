import './styles.less';
import Map from './modules/map/map';

class App {
  constructor() {
    const map = new Map();
    map.initMap();
  }
}

new App();