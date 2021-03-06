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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
    this.minHeight = this.height / 3;
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
    key: "sinHeight",
    value: function sinHeight(x) {
      var yOffset = (this.minHeight + this.height) / 2;
      var amplitude = (this.height - this.minHeight) / 2;
      var period = 2 * Math.PI / this.width * (3 / 2);
      return amplitude * Math.sin(period * x) + yOffset;
    }
  }, {
    key: "fillColor",
    value: function fillColor() {
      for (var _len = arguments.length, colors = Array(_len), _key = 0; _key < _len; _key++) {
        colors[_key] = arguments[_key];
      }

      for (var x = 0; x < this.imageData.width; x++) {
        var height = Math.floor(this.sinHeight(x));
        for (var y = height - this.minHeight; y < this.height; y++) {

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

var _tank = __webpack_require__(4);

var _tank2 = _interopRequireDefault(_tank);

var _bitmap = __webpack_require__(0);

var _bitmap2 = _interopRequireDefault(_bitmap);

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
  function World(canvas) {
    var numPlayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, World);

    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvases = {};
    this.firing = false;
    this.transition = true;
    this.minTransitionSize = 10;
    this.maxTransitionSize = 100;
    this.transitionSize = this.minTransitionSize;

    this.level = new _level2.default(this.width, this.height);

    this.numTanks = 4;
    this.tankColors = ["rgba(40,100,100,255)", "rgba(150,0,0,255)", "rgba(0,0,150,255)", "rgba(150,150,0,255)"];
    this.tanks = {};
    var spacing = this.width / this.numTanks;

    var playerAIs = [false, true, true, true];

    for (var i = 0; i < numPlayers; i++) {
      playerAIs[i] = false;
    }

    this.players = {};
    for (var _i = 0; _i < this.numTanks; _i++) {
      this.tanks[_i] = new _tank2.default(_i * spacing + spacing / 2 - 30, 0, this.tankColors[_i], canvas);
      this.players[_i] = new _player2.default(this.tanks[_i], this.fireBullet.bind(this), this, playerAIs[_i]);
    }
    this.tank = 0;

    this.bindKeyPresses();

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
      if (this.tanks[this.tank].health <= 0) {
        this.nextTurn();
      } else {
        this.transitionSize = this.minTransitionSize;
        this.transition = true;
      }
    }
  }, {
    key: 'fireBullet',
    value: function fireBullet() {
      if (this.firing) return;
      this.bullet = this.tanks[this.tank].fire();
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
          for (var _i2 = 0; _i2 < this.numTanks; _i2++) {
            this.tanks[_i2].explosion(this.bullet.x, this.bullet.y, this.bullet.radius);
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
      return x < 0 || x > this.width || y > this.height;
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.transition) {
        this.paint();
      } else if (this.firing) {
        this.bulletPhysics();
      } else {
        this.players[this.tank].move(this.level);
      }

      for (var t = 0; t < this.numTanks; t++) {
        this.players[t].physics(this.level);
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

      // Paint transition frames
      if (this.transition) {
        var x = this.width / 2;
        var y = this.height / 2;
        this.ctx.textAlign = "center";
        var alpha = 1 - this.transitionSize / this.maxTransitionSize;
        var color = this.tanks[this.tank].color.split(",").splice(0, 3).join(",") + ',' + alpha + ')';
        this.ctx.fillStyle = color;
        this.ctx.font = this.transitionSize + 'px sans-serif';
        this.ctx.fillText('Player ' + (this.tank + 1), x, y);
        this.transitionSize += 1;
        if (this.transitionSize > this.maxTransitionSize) this.transition = false;
        this.ctx.font = '10px sans-serif';
        this.ctx.textAlign = "left";
      }

      // Paint information
      if (this.informationHover) {
        this.drawControls();
      }
    }
  }, {
    key: 'drawControls',
    value: function drawControls() {}
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
        if (key === 87) _this2.powerUp = down;
        if (key === 83) _this2.powerDown = down;
      };
    }
  }, {
    key: 'bindKeyPresses',
    value: function bindKeyPresses() {
      this.leftKey = false;
      this.rightKey = false;
      this.spaceKey = false;
      this.aimRight = false;
      this.powerUp = false;
      this.powerDown = false;

      document.onkeydown = this.keyChange(true);
      document.onkeyup = this.keyChange(false);
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
    this.backgroundColor = "rgba(255, 255, 255, 255)";

    var buffer = document.createElement('canvas');
    buffer.height = this.height;
    buffer.width = this.width;
    this.ctx = buffer.getContext("2d");

    this.terrain_bitmap = new _bitmap2.default(this.ctx.createImageData(this.width, this.height * 3 / 4));
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
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fill();
      this.ctx.closePath();

      //update
      var _terrain_bitmap = this.terrain_bitmap,
          tx = _terrain_bitmap.x,
          ty = _terrain_bitmap.y,
          width = _terrain_bitmap.width,
          height = _terrain_bitmap.height;

      var newCanvasData = this.ctx.getImageData(tx, ty, width, height);
      this.terrain_bitmap.imageData = newCanvasData;
      this.ctx.putImageData(newCanvasData, tx, ty);
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

var Player = function () {
  function Player(tank, fireBullet, world) {
    var ai = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Player);

    this.tank = tank;
    this.fireBullet = fireBullet;
    this.world = world;
    this.ai = ai;
    this.moving = false;
    this.waiting = 50;
  }

  _createClass(Player, [{
    key: "move",
    value: function move(level) {
      if (this.ai) {
        if (this.motion) {
          if (this.aiming < 0) {
            this.tank.aim("left");
            this.aiming += 1;
          } else if (this.aiming > 0) {
            this.tank.aim("right");
            this.aiming -= 1;
          }
          if (this.moving < 0) {
            this.tank.move("left")(level);
            this.moving += 1;
          } else if (this.moving > 0) {
            this.tank.move("right")(level);
            this.moving -= 1;
          }
          if (this.powering < 0) {
            this.tank.changePower("up")();
            this.powering += 1;
          } else if (this.powering > 0) {
            this.tank.changePower("down")();
            this.powering -= 1;
          }
          if (this.powering === 0 && this.moving === 0 && this.aiming === 0) {
            this.fireBullet();
            this.motion = false;
            this.waiting = 50;
          }
        } else {
          if (this.waiting === 0) {
            this.motion = true;
            this.aiming = Math.floor(Math.random() * 500 - 250);
            this.moving = Math.floor(Math.random() * 50 - 25);
            this.powering = Math.floor(Math.random() * 10 - 5);
          } else {
            this.waiting--;
          }
        }
      } else {
        if (this.world.aimLeft) this.tank.aim("left");
        if (this.world.aimRight) this.tank.aim("right");
        if (this.world.leftKey) this.tank.move("left")(level);
        if (this.world.rightKey) this.tank.move("right")(level);
        if (this.world.powerUp) this.tank.changePower("up")();
        if (this.world.powerDown) this.tank.changePower("down")();
        if (this.world.spaceKey) this.fireBullet();
      }
    }
  }, {
    key: "physics",
    value: function physics(level) {
      this.tank.speed++;
      if (this.tank.speed > 0) {
        for (var i = 0; i < this.tank.speed; i++) {
          if (!this.tank.out && !level.collision(this.tank.hitbox(0, 10, 30, 1))) {
            this.tank.y += 1;
          } else {
            this.tank.speed = 0;
          }
        }
        if (this.world.outOfBounds(this.tank.x, this.tank.y) && this.tank.alive()) {
          this.tank.kill();
          this.world.nextTurn();
        }
      }
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 4 */
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
    this.angle = 90;
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

    this.out = false;

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
      var v = this.power + 1;
      this.fuel = this.maxFuel;
      return {
        vx: v * Math.cos(this.angle * Math.PI / 180),
        vy: -v * Math.sin(this.angle * Math.PI / 180),
        x: this.x + this.w / 2,
        y: this.y,
        radius: 50
      };
    }
  }, {
    key: "changePower",
    value: function changePower(direction) {
      var _this = this;

      var change = 0;
      if (direction === "up") {
        change = 0.5;
      } else {
        change = -0.5;
      }

      return function () {
        _this.power += change;
        if (_this.power > _this.maxPower) _this.power = _this.maxPower;
        if (_this.power < 0) _this.power = 0;
      };
    }
  }, {
    key: "move",
    value: function move(direction) {
      var _this2 = this;

      var x = void 0;
      var outOfBounds = void 0;
      if (direction === "left") {
        direction = -1;
        x = 0;
        outOfBounds = function outOfBounds() {
          return _this2.x - 1 < 0;
        };
      } else {
        direction = 1;
        x = this.w;
        outOfBounds = function outOfBounds(level) {
          return _this2.x + x + 1 > level.width;
        };
      }

      return function (level) {
        if (_this2.fuel <= 0) return;
        if (!level.collision(_this2.hitbox(x, 0, 1, 1)) && !outOfBounds(level)) {
          _this2.x += direction;
          _this2.fuel -= 1.5;
        }
        while (level.collision(_this2.hitbox(0, _this2.h, _this2.w, 1))) {
          _this2.y -= 1;
        }
      };
    }
  }, {
    key: "kill",
    value: function kill() {
      this.health = 0;
      this.out = true;
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
      if (this.health < 0) this.health = 0;
    }
  }, {
    key: "distance",
    value: function distance(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
  }, {
    key: "draw",
    value: function draw(context) {
      if (this.out) return;

      if (this.health <= 0) {
        context.fillStyle = "rgba(0,0,0,150)";
        context.fillRect(this.x, this.y, this.w, this.h);
        return;
      }

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
      context.fillText("Player " + (offset + 1), 10, 19 + 20 * offset);
      context.fillRect(75, 10 + 20 * offset, this.health, 10);
      context.strokeRect(75, 10 + 20 * offset, this.maxHealth, 10);
    }
  }, {
    key: "drawStats",
    value: function drawStats(context, offset) {
      // Fuel
      context.fillStyle = this.color;
      context.fillText("Fuel: ", 195, 19 + 20 * offset);
      context.strokeRect(220, 10 + 20 * offset, this.maxFuel, 10);
      context.fillRect(220, 10 + 20 * offset, this.fuel, 10);

      // Power
      var startX = 330;
      context.fillStyle = this.color;
      context.fillText("Power: ", startX, 19 + 20 * offset);
      context.strokeRect(startX + 35, 10 + 20 * offset, this.maxPower * 10, 10);
      context.fillRect(startX + 35, 10 + 20 * offset, this.power * 10, 10);
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
      var timeWidth = Math.sin(d.getTime() / 350) * 7;
      var x0 = this.x + this.w / 2;
      var y0 = this.y - 50 + timeOffset;
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x0 - timeWidth, y0 - 20);
      context.lineTo(x0 + timeWidth, y0 - 20);
      context.lineTo(x0, y0);
      context.fill();
      context.closePath();

      // Fuel and Power
      this.drawStats(context, offset);
    }
  }, {
    key: "alive",
    value: function alive() {
      return this.health > 0;
    }
  }]);

  return Tank;
}();

exports.default = Tank;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _world = __webpack_require__(1);

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newGame = function newGame() {
  var canvasContainer = document.getElementById("canvas-container");
  var canvas = document.getElementById("canvas");
  canvas.width = Math.floor(canvasContainer.offsetWidth);
  canvas.height = Math.floor(canvasContainer.offsetHeight);

  var numPlayers = parseInt(document.getElementById("number-of-players-selector").value);
  var world = new _world2.default(canvas, numPlayers);
};

window.addEventListener("load", function () {
  newGame();
  var modal = document.getElementsByClassName('modal')[0];
  var btn = document.getElementById("controls");
  var span = document.getElementsByClassName("close")[0];

  btn.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var newBtn = document.getElementById('new-game');
  newBtn.addEventListener("click", function () {
    newGame();
    modal.style.display = "none";
  });

  var contBtn = document.getElementById('continue');
  contBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map