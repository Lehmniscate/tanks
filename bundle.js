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
        var x = Math.floor(hitbox.grid[i][0]);
        var y = Math.floor(hitbox.grid[i][1]);
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
    this.firing = false;

    this.level = new _level2.default(this.width, this.height);

    this.numTanks = 4;
    this.tankColors = ["rgba(40,100,100,255)", "rgba(150,0,0,255)", "rgba(0,0,150,255)", "rgba(150,150,0,255)"];
    this.tanks = {};
    var spacing = this.width / this.numTanks;
    for (var i = 0; i < this.numTanks; i++) {
      this.tanks[i] = new _tank2.default(i * spacing + spacing / 2 - 30, 0, this.tankColors[i], canvas);
    }
    this.tank = 0;

    document.onkeydown = this.keyChange(true);
    document.onkeyup = this.keyChange(false);
    this.leftKey = false;
    this.rightKey = false;
    this.spaceKey = false;
    this.aimLeft = false;
    this.aimRight = false;

    this.paint();
    this.loop();
  }

  _createClass(World, [{
    key: 'loop',
    value: function loop() {
      var _this = this;

      this.move();
      requestAnimationFrame(function () {
        return _this.loop();
      });
    }
  }, {
    key: 'nextTurn',
    value: function nextTurn() {
      this.tank = (this.tank + 1) % this.numTanks;
      if (this.tanks[this.tank].health <= 0) this.nextTurn();
    }
  }, {
    key: 'fireBullet',
    value: function fireBullet() {
      var v = 7;
      this.bullet = {
        vx: v * Math.cos(this.tanks[this.tank].angle * Math.PI / 180),
        vy: -v * Math.sin(this.tanks[this.tank].angle * Math.PI / 180),
        x: this.tanks[this.tank].x + this.tanks[this.tank].w / 2,
        y: this.tanks[this.tank].y,
        radius: 40
      };
      this.firing = true;
    }
  }, {
    key: 'bulletPhysics',
    value: function bulletPhysics() {
      this.bullet.vy += 0.1;

      var steps = Math.ceil(Math.pow(this.bullet.vy, 2) + Math.pow(this.bullet.vx, 2));

      for (var i = 0; i < steps; i += 1) {
        this.bullet.x += this.bullet.vx / steps;
        this.bullet.y += this.bullet.vy / steps;

        var grid = [[this.bullet.x, this.bullet.y]];

        if (this.level.collision({ grid: grid })) {
          this.level.explosion(this.bullet.x, this.bullet.y, this.bullet.radius);
          for (var _i = 0; _i < this.numTanks; _i++) {
            this.tanks[_i].explosion(this.bullet.x, this.bullet.y, this.bullet.radius);
          }
          this.firing = false;
          this.nextTurn();
          break;
        } else if (this.outOfBounds(this.bullet.x, this.bullet.y)) {
          this.firing = false;
          this.nextTurn();
          break;
        }
      }
    }
  }, {
    key: 'outOfBounds',
    value: function outOfBounds(x, y) {
      return x < 0 || x > this.width || y < 0 || y > this.height;
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.spaceKey || this.firing) {
        if (!this.firing) {
          this.fireBullet();
        } else {
          this.bulletPhysics();
        }
      } else {
        if (this.aimLeft) this.tanks[this.tank].aim("left");
        if (this.aimRight) this.tanks[this.tank].aim("right");
        if (this.leftKey) this.tanks[this.tank].move("left")(this.level);
        if (this.rightKey) this.tanks[this.tank].move("right")(this.level);
      }

      for (var t = 0; t < this.numTanks; t++) {
        this.tanks[t].speed++;
        if (this.tanks[t].speed > 0) {
          for (var i = 0; i < this.tanks[t].speed; i++) {
            if (!this.level.collision(this.tanks[t].hitbox(0, 10, 30, 1))) {
              this.tanks[t].y += 1;
            } else {
              this.tanks[t].speed = 0;
            }
          }
        }
      }
      this.paint();
    }
  }, {
    key: 'paint',
    value: function paint() {
      // Clear screen
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Paint terrain
      this.level.draw(this.ctx);

      // Paint bullet
      if (this.firing) {
        this.ctx.beginPath();
        this.ctx.arc(this.bullet.x, this.bullet.y, 3, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "rgba(0,0,0,255)";
        this.ctx.fill();
        this.ctx.closePath();
      }

      // Paint tanks
      for (var i = 0; i < this.numTanks; i++) {
        this.tanks[i].draw(this.ctx);
        // Paint healthbars
        this.tanks[i].drawHealth(this.ctx, i);
      }

      this.tanks[this.tank].drawTurnSymbol(this.ctx, this.tank);
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
  function Level(width, height) {
    _classCallCheck(this, Level);

    this.width = width;
    this.height = height;

    var buffer = document.createElement('canvas');
    buffer.height = this.height;
    buffer.width = this.width;
    this.ctx = buffer.getContext("2d");

    this.terrain_bitmap = new _bitmap2.default(this.ctx.createImageData(this.width, this.height / 2));
    this.terrain_bitmap.fillColor(50, 175, 50, 255);
    this.terrain_bitmap.y = this.height - this.terrain_bitmap.height;

    this.ctx.putImageData(this.terrain_bitmap.imageData, this.terrain_bitmap.x, this.terrain_bitmap.y);
  }

  _createClass(Level, [{
    key: 'draw',
    value: function draw(context) {
      context.drawImage(this.ctx.canvas, 0, 0);
    }
  }, {
    key: 'collision',
    value: function collision(hitbox) {
      return this.terrain_bitmap.collision(hitbox);
    }
  }, {
    key: 'explosion',
    value: function explosion(x, y, r) {
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
      this.ctx.fillStyle = "rgba(255, 255, 255, 255)";
      this.ctx.fill();
      this.ctx.closePath();

      //update
      var newCanvasData = this.ctx.getImageData(this.terrain_bitmap.x, this.terrain_bitmap.y, this.terrain_bitmap.width, this.terrain_bitmap.height);
      this.terrain_bitmap.imageData = newCanvasData;
      this.ctx.putImageData(newCanvasData, this.terrain_bitmap.x, this.terrain_bitmap.y);
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
  function Tank(x, y, color, canvas) {
    _classCallCheck(this, Tank);

    this.cannonAngle = 0;
    this.angle = 0;
    this.color = color || "rgba(50,100,150,255)";
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 10;
    this.speed = 0;
    this.maxHealth = 100;
    this.health = this.maxHealth;

    this.maxPower = 10;
    this.power = 7;

    this.maxFuel = 100;
    this.fuel = this.maxFuel;

    var buffer = document.createElement('canvas');
    buffer.height = canvas.height;
    buffer.width = canvas.width;
    var ctx = buffer.getContext("2d");
    this.context = ctx;
  }

  _createClass(Tank, [{
    key: "aim",
    value: function aim(direction) {
      if (direction === "left") {
        if (this.angle < 180) this.angle += 0.5;
      } else {
        if (this.angle > 0) this.angle -= 0.5;
      }
    }
  }, {
    key: "fire",
    value: function fire() {
      var v = this.power || 7;
      return {
        vx: v * Math.cos(this.angle * Math.PI / 180),
        vy: -v * Math.sin(this.angle * Math.PI / 180),
        x: this.x + this.w / 2,
        y: this.y
      };
      this.fuel = this.maxFuel;
    }
  }, {
    key: "move",
    value: function move(direction) {
      var _this = this;

      var x = void 0;
      if (direction === "left") {
        direction = -1;
        x = 0;
      } else {
        direction = 1;
        x = this.w;
      }

      return function (level) {
        if (_this.fuel <= 0) return;
        if (!level.collision(_this.hitbox(x, 0, 1, 1))) {
          _this.x += direction;
          _this.fuel -= 1.5;
        }
        while (level.collision(_this.hitbox(0, _this.h, _this.w, 1))) {
          _this.y -= 1;
        }
      };
    }
  }, {
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
    key: "explosion",
    value: function explosion(x, y, radius) {
      if (this.health <= 0) return;
      var distance = Math.min(this.distance(x, y, this.x, this.y), this.distance(x, y, this.x + this.w, this.y), this.distance(x, y, this.x, this.y + this.h), this.distance(x, y, this.x + this.w, this.y + this.h));
      if (distance < radius) this.health -= 50 - 50 * distance / radius;
    }
  }, {
    key: "distance",
    value: function distance(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
  }, {
    key: "draw",
    value: function draw(context) {
      if (this.health <= 0) {
        context.fillStyle = "rgba(0,0,0,150)";
        context.fillRect(this.x, this.y, this.w, this.h);
        return;
      }
      // context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.w, this.h);
      context.beginPath();
      context.arc(this.x + this.w / 2, this.y, this.w / 4, 0, 2 * Math.PI, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();

      context.translate(this.x + this.w / 2, this.y);
      context.rotate(-this.angle * Math.PI / 180);
      context.fillRect(0, -2.5, this.w / 4 * 3, 5);
      context.rotate(this.angle * Math.PI / 180);
      context.translate(-(this.x + this.w / 2), -this.y);
    }
  }, {
    key: "drawHealth",
    value: function drawHealth(context, offset) {
      context.fillStyle = this.color;
      context.fillText("Player " + (offset + 1), 10, 17 + 20 * offset);
      context.fillRect(75, 10 + 20 * offset, this.health, 10);
      context.strokeRect(75, 10 + 20 * offset, this.maxHealth, 10);
    }
  }, {
    key: "drawStats",
    value: function drawStats(context, offset) {
      context.fillStyle = this.color;
      context.fillText("Fuel: ", 195, 17 + 20 * offset);
      context.strokeRect(220, 10 + 20 * offset, this.maxFuel, 10);
      context.fillRect(220, 10 + 20 * offset, this.fuel, 10);
    }
  }, {
    key: "drawTurnSymbol",
    value: function drawTurnSymbol(context, offset) {
      context.fillStyle = this.color;
      context.strokeRect(6, 6 + 20 * offset, 75 + this.maxHealth + 4, 18);

      // Floating indicator
      if (this.health < 0) this.health = 0;
      var d = new Date();
      var timeOffset = Math.sin(d.getTime() / 500) * 15;
      var x0 = this.x + this.w / 2;
      var y0 = this.y - 50 + timeOffset;
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x0 - 5, y0 - 20);
      context.lineTo(x0 + 5, y0 - 20);
      context.lineTo(x0, y0);
      context.fill();
      context.closePath();

      // Fuel and Power
      this.drawStats(context, offset);
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
  var canvasContainer = document.getElementById("canvas-container");
  var canvas = document.getElementById("canvas");
  canvas.width = Math.floor(canvasContainer.offsetWidth);
  canvas.height = Math.floor(canvasContainer.offsetHeight);
  var world = new _world2.default(canvas);
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map