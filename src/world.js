import Level from './level';
import Tank from './tank';
import Bitmap from './bitmap';

export default class World {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvases = {};
    this.firing = false;
    this.transition = true;
    this.minTransitionSize = 10;
    this.maxTransitionSize = 100;
    this.transitionSize = this.minTransitionSize;

    this.level = new Level(this.width, this.height);

    this.numTanks = 4;
    this.tankColors = [
      "rgba(40,100,100,255)",
      "rgba(150,0,0,255)",
      "rgba(0,0,150,255)",
      "rgba(150,150,0,255)"
    ]
    this.tanks = {};
    let spacing = this.width / (this.numTanks );
    for(let i = 0; i < this.numTanks; i++) {
      this.tanks[i] = new Tank((i * spacing) + (spacing / 2) - 30, 0, this.tankColors[i], canvas);
    }
    this.tank = 0;

    document.onkeydown = this.keyChange(true);
    document.onkeyup = this.keyChange(false);
    this.leftKey = false;
    this.rightKey = false;
    this.spaceKey = false;
    this.aimLeft = false;
    this.aimRight = false;
    this.powerUp = false;
    this.powerDown = false;

    this.paint();
    this.loop();
  }

  loop() {
    this.move();
    requestAnimationFrame(() => this.loop());
  }

  nextTurn() {
    this.tank = (this.tank + 1) % this.numTanks;
    if(this.tanks[this.tank].health <= 0) this.nextTurn();
    this.transitionSize = this.minTransitionSize;
    this.transition = true;
  }

  fireBullet() {
    this.bullet = this.tanks[this.tank].fire();
    this.firing = true;
  }

  bulletPhysics() {
    this.bullet.vy += 0.1;

    let steps = Math.ceil(Math.pow(this.bullet.vy, 2) + Math.pow(this.bullet.vx, 2));

    for(let i = 0; i < steps; i += 1) {
      this.bullet.x += (this.bullet.vx / steps);
      this.bullet.y += (this.bullet.vy / steps);

      let grid = [[this.bullet.x, this.bullet.y]];

      if(this.level.collision({grid})) {
        this.level.explosion(this.bullet.x, this.bullet.y, this.bullet.radius);
        for(let i = 0; i < this.numTanks; i++) {
          this.tanks[i].explosion(this.bullet.x, this.bullet.y, this.bullet.radius);
        }
        this.firing = false;
        this.nextTurn();
        break;
      } else if(this.outOfBounds(this.bullet.x, this.bullet.y)) {
        this.firing = false;
        this.nextTurn();
        break;
      }
    }
  }

  outOfBounds(x, y) {
    return x < 0 || x > this.width || y > this.height;
  }

  move() {
    if(this.transition) {
      this.paint();
    } else if (this.spaceKey || this.firing) {
      if(!this.firing) {
        this.fireBullet();
      } else {
        this.bulletPhysics();
      }
    } else {
      if (this.aimLeft) this.tanks[this.tank].aim("left");
      if (this.aimRight) this.tanks[this.tank].aim("right");
      if (this.leftKey) this.tanks[this.tank].move("left")(this.level);
      if (this.rightKey) this.tanks[this.tank].move("right")(this.level);
      if (this.powerUp) this.tanks[this.tank].changePower("up")();
      if (this.powerDown) this.tanks[this.tank].changePower("down")();
    }

    for(let t = 0; t < this.numTanks; t++){
      this.tanks[t].speed++;
      if (this.tanks[t].speed > 0) {
        for (let i = 0; i < this.tanks[t].speed; i++) {
          if (!this.tanks[t].out && !this.level.collision(this.tanks[t].hitbox(0, 10, 30, 1))) {
            this.tanks[t].y += 1;
          } else {
            this.tanks[t].speed = 0;
          }
        }
        if (this.outOfBounds(this.tanks[t].x, this.tanks[t].y)) {
          this.tanks[t].kill();
          this.nextTurn();
        }
      }
    }
    this.paint();
  }

  paint() {
    // Clear screen
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Paint terrain
    this.level.draw(this.ctx);

    // Paint bullet
    if(this.firing) {
      this.ctx.beginPath();
      this.ctx.arc(this.bullet.x, this.bullet.y, 3, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = "rgba(0,0,0,255)";
      this.ctx.fill();
      this.ctx.closePath();
    }

    // Paint tanks
    for(let i = 0; i < this.numTanks; i++) {
      this.tanks[i].draw(this.ctx);
      // Paint healthbars
      this.tanks[i].drawHealth(this.ctx, i);
    }

    this.tanks[this.tank].drawTurnSymbol(this.ctx, this.tank);

    // Paint transition frames
    if(this.transition) {
      let x = this.width / 2;
      let y = this.height / 2;
      this.ctx.textAlign = "center";
      let alpha = 1 - (this.transitionSize / this.maxTransitionSize);
      let color =  `${this.tanks[this.tank].color.split(",").splice(0, 3).join(",")},${alpha})`;
      this.ctx.fillStyle = color;
      this.ctx.font = `${this.transitionSize}px sans-serif`;
      this.ctx.fillText(`Player ${this.tank + 1}`, x, y);
      this.transitionSize += 1;
      if(this.transitionSize > this.maxTransitionSize) this.transition = false;
      this.ctx.font = `10px sans-serif`;
      this.ctx.textAlign = "left";
    }

    // Paint information
    if(this.informationHover) {
      this.drawControls();
    }
  }

  drawControls() {

  }

  keyChange(down) {
    return e => {
      let key = e.keyCode;
      if(key === 37) this.leftKey = down;
      if(key === 39) this.rightKey = down;
      if(key === 65) this.aimLeft = down;
      if(key === 68) this.aimRight = down;
      if(key === 32) this.spaceKey = down;
      if(key === 87) this.powerUp = down;
      if(key === 83) this.powerDown = down;
    }
  }
}
