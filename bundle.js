/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bitmap = function () {
  function Bitmap(imageData) {
    _classCallCheck(this, Bitmap);

    this.imageData = imageData;
    this.height = this.imageData.height;
    this.width = this.imageData.width;
    this.x = 0;
    this.y = 0;
  }

  _createClass(Bitmap, [{
    key: "collision",
    value: function collision(hitbox, color) {
      color = color || "RGBA(50,175,50,255)";
      for (var i = 0; i < hitbox.grid.length; i++) {
        var x = hitbox.grid[i][0];
        var y = hitbox.grid[i][1];
        var pixel = this.getPixel(x, y);

        if (pixel === color) return true;
      }
      return false;
    }
  }, {
    key: "fillColor",
    value: function fillColor() {
      for (var _len = arguments.length, colors = Array(_len), _key = 0; _key < _len; _key++) {
        colors[_key] = arguments[_key];
      }

      for (var x = 0; x < this.imageData.width; x++) {
        for (var y = 0; y < this.imageData.height; y++) {

          var idx = (x + y * this.width) * 4;
          for (var i = 0; i < 4; i++) {
            this.imageData.data[idx + i] = colors[i];
          }
        }
      }
    }
  }, {
    key: "getPixel",
    value: function getPixel(x, y) {
      x -= this.x;
      y -= this.y;
      var image = this.imageData;

      if (x < 0 || y < 0 || x > image.width || y > image.height) return;

      var r = (y * image.width + x) * 4;

      return "RGBA(" + image.data[r] + "," + image.data[r + 1] + "," + image.data[r + 2] + "," + image.data[r + 3] + ")";
    }
  }]);

  return Bitmap;
}();

exports.default = Bitmap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _level = __webpack_require__(2);

var _level2 = _interopRequireDefault(_level);

var _tank = __webpack_require__(3);

var _tank2 = _interopRequireDefault(_tank);

var _bitmap = __webpack_require__(0);

var _bitmap2 = _interopRequireDefault(_bitmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
  function World(canvas) {
    _classCallCheck(this, World);

    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvases = {};
    this.level = new _level2.default(this.ctx, this.width, this.height);
    this.level.terrain_bitmap.y = this.height - this.level.terrain_bitmap.height;

    this.tank = new _tank2.default(20, 20);

    document.onkeydown = this.keyChange(true);
    document.onkeyup = this.keyChange(false);
    document.onmouseup = this.mouse_up.bind(this);

    this.leftKey = false;
    this.rightKey = false;
    this.spaceKey = false;
    this.aimLeft = false;
    this.aimRight = false;

    this.add_child("terrain", this.level.terrain_bitmap);
    this.draw_objects();

    this.loop();
  }

  _createClass(World, [{
    key: 'loop',
    value: function loop() {
      var _this = this;

      this.move_character();
      setTimeout(function () {
        return _this.loop();
      }, 1000 / 100);
    }
  }, {
    key: 'move_character',
    value: function move_character() {
      if (this.leftKey) {
        if (!this.level.collision(this.tank.hitbox(0, 0, 1, 1))) {
          this.tank.x -= 1;
        }
        while (this.level.collision(this.tank.hitbox(0, 20, 10, 1))) {
          this.tank.y -= 1;
        }
      }

      if (this.rightKey) {
        if (!this.level.collision(this.tank.hitbox(10, 0, 1, 1))) {
          this.tank.x += 1;
        }
        while (this.level.collision(this.tank.hitbox(0, 20, 10, 1))) {
          this.tank.y -= 1;
        }
      }
      this.tank.speed++;
      if (this.tank.speed > 0) {
        //check ground
        for (var i = 0; i < this.tank.speed; i++) {
          if (!this.level.collision(this.tank.hitbox(0, 20, 10, 1))) {
            this.tank.y += 1;
          } else {
            this.tank.speed = 0;
          }
        }
      }
      this.drawTank();
    }
  }, {
    key: 'add_child',
    value: function add_child(name, bitmap) {
      //stores the canvases in temporary obj to manipulate later
      var buffer = document.createElement('canvas');
      buffer.height = this.height;
      buffer.width = this.width;

      var ctx = buffer.getContext("2d");
      ctx.putImageData(bitmap.imageData, bitmap.x, bitmap.y);

      this.canvases[name] = ctx;
    }
  }, {
    key: 'drawTank',
    value: function drawTank() {
      var buffer = document.createElement('canvas');
      buffer.height = this.height;
      buffer.width = this.width;

      var ctx = buffer.getContext("2d");
      this.tank.draw(ctx);
      this.canvases["tank"] = ctx;

      this.draw_objects();
    }
  }, {
    key: 'draw_objects',
    value: function draw_objects() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (var key in this.canvases) {
        var obj = this.canvases[key];
        if (obj) this.ctx.drawImage(obj.canvas, 0, 0);
      }
    }
  }, {
    key: 'keyChange',
    value: function keyChange(down) {
      var _this2 = this;

      return function (e) {
        var key = e.keyCode;
        if (key === 37) _this2.leftKey = down;
        if (key === 39) _this2.rightKey = down;
        if (key === 65) _this2.aimLeft = down;
        if (key === 68) _this2.aimRight = down;
        if (key === 32) _this2.spaceKey = down;
      };
    }
  }, {
    key: 'mouse_up',
    value: function mouse_up() {
      var x = event.offsetX,
          y = event.offsetY;

      this.canvases.terrain.globalCompositeOperation = "destination-out";
      this.canvases.terrain.beginPath();
      this.canvases.terrain.arc(x, y, 30, 0, Math.PI * 2, true);
      this.canvases.terrain.fill();

      //update
      var newCanvasData = this.canvases.terrain.getImageData(this.level.terrain_bitmap.x, this.level.terrain_bitmap.y, this.level.terrain_bitmap.width, this.level.terrain_bitmap.height);
      this.level.terrain_bitmap.imageData = newCanvasData;
      this.canvases.terrain.putImageData(newCanvasData, this.level.terrain_bitmap.x, this.level.terrain_bitmap.y);
      this.draw_objects();
    }
  }]);

  return World;
}();

exports.default = World;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitmap = __webpack_require__(0);

var _bitmap2 = _interopRequireDefault(_bitmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function () {
  function Level(ctx, width, height) {
    _classCallCheck(this, Level);

    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.terrain_bitmap = new _bitmap2.default(this.ctx.createImageData(this.width, this.height / 2));
    this.terrain_bitmap.fillColor(50, 175, 50, 255);
  }

  _createClass(Level, [{
    key: 'collision',
    value: function collision(hitbox) {
      return this.terrain_bitmap.collision(hitbox);
    }
  }]);

  return Level;
}();

exports.default = Level;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tank = function () {
  function Tank(x, y, color) {
    _classCallCheck(this, Tank);

    this.cannonAngle = 0;
    this.angle = 0;
    this.color = color || "rgb(50,100,150)";
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 20;
    this.speed = 0;
  }

  _createClass(Tank, [{
    key: "hitbox",
    value: function hitbox(xOffset, yOffset, w, h) {
      var x = this.x + xOffset;
      var y = this.y + yOffset;
      var grid = [];
      for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
          grid.push([x + i, y + j]);
        }
      }
      return { grid: grid };
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.w, this.h);
    }
  }]);

  return Tank;
}();

exports.default = Tank;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _world = __webpack_require__(1);

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", function () {
  var canvas = document.getElementById("canvas");
  var world = new _world2.default(canvas);
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map