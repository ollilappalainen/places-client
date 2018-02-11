/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _map = __webpack_require__(/*! ./modules/map */ 1);\n\nvar map = new _map.Map();\nmap.addMapToIndex();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwLmpzP2JkOWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNYXB9IGZyb20gJy4vbW9kdWxlcy9tYXAnO1xuXG5jb25zdCBtYXAgPSBuZXcgTWFwKCk7XG5tYXAuYWRkTWFwVG9JbmRleCgpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2FwcC5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!****************************!*\
  !*** ./src/modules/map.js ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Map = function () {\n  function Map() {\n    _classCallCheck(this, Map);\n  }\n\n  _createClass(Map, [{\n    key: 'initMap',\n    value: function initMap() {\n      var hki = { lat: 60.192059, lng: 24.945831 };\n      var map = new google.maps.Map(document.getElementById('map'), {\n        zoom: 14,\n        center: hki\n      });\n      var marker = new google.maps.Marker({\n        position: hki,\n        map: map\n      });\n\n      map.addListener('click', function (e) {\n        addMarker(e.latLng, map);\n      });\n    }\n  }, {\n    key: 'addMarker',\n    value: function addMarker(latLng, map) {\n      var marker = new google.maps.Marker({\n        position: latLng,\n        map: map\n      });\n      map.panTo(latLng);\n      console.log(marker);\n    }\n  }, {\n    key: 'addMapToIndex',\n    value: function addMapToIndex() {\n      var initMap = this.initMap();\n      //const apiKey = process.env.GOOGLE_API_KEY;  \n      var map = document.createElement('script');\n      map.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAub_fvMVVHw1VsW1XNpGpFOCtlktsxa6A&callback=initMap';\n\n      document.getElementById('map').appendChild(map);\n    }\n  }]);\n\n  return Map;\n}();\n\nexports.Map = Map;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvbW9kdWxlcy9tYXAuanM/ZjE1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBNYXAge1xuICBpbml0TWFwKCkge1xuICAgIGNvbnN0IGhraSA9IHtsYXQ6IDYwLjE5MjA1OSwgbG5nOiAyNC45NDU4MzF9O1xuICAgIGNvbnN0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XG4gICAgICB6b29tOiAxNCxcbiAgICAgIGNlbnRlcjogaGtpXG4gICAgfSk7XG4gICAgY29uc3QgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICBwb3NpdGlvbjogaGtpLFxuICAgICAgbWFwOiBtYXBcbiAgICB9KTtcbiAgXG4gICAgbWFwLmFkZExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBhZGRNYXJrZXIoZS5sYXRMbmcsIG1hcCk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihsYXRMbmcsIG1hcCkge1xuICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IGxhdExuZyxcbiAgICAgIG1hcDogbWFwXG4gICAgfSk7XG4gICAgbWFwLnBhblRvKGxhdExuZyk7XG4gICAgY29uc29sZS5sb2cobWFya2VyKTtcbiAgfVxuICBcbiAgYWRkTWFwVG9JbmRleCgpIHtcbiAgICBjb25zdCBpbml0TWFwID0gdGhpcy5pbml0TWFwKCk7XG4gICAgLy9jb25zdCBhcGlLZXkgPSBwcm9jZXNzLmVudi5HT09HTEVfQVBJX0tFWTsgIFxuICAgIGNvbnN0IG1hcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIG1hcC5zcmM9J2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcz9rZXk9QUl6YVN5QXViX2Z2TVZWSHcxVnNXMVhOcEdwRk9DdGxrdHN4YTZBJmNhbGxiYWNrPWluaXRNYXAnO1xuICBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykuYXBwZW5kQ2hpbGQobWFwKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBNYXBcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL21hcC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFJQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ })
/******/ ]);