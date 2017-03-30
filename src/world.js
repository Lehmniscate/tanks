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
    this.level = new Level(this.ctx, this.width, this.height);
    this.canvases["terrain"] = this.level.context;

    this.tank = new Tank(20, 20, "rgba(10, 20, 30, 255)", canvas);
    this.canvases["tank"] = this.tank.context;

    document.onkeydown = this.keyChange(true);
    document.onkeyup = this.keyChange(false);

    this.leftKey = false;
    this.rightKey = false;
    this.spaceKey = false;
    this.aimLeft = false;
    this.aimRight = false;

    this.add_child("terrain", this.level.terrain_bitmap);
    this.draw_objects();

    this.loop();
  }

  loop() {
    this.move_character();
    setTimeout(() => this.loop(), 1000/100);
  }

  fireBullet() {
    let buffer = document.createElement('canvas');
    buffer.height = this.height;
    buffer.width = this.width;
    let ctx = buffer.getContext("2d");
    this.canvases["bullet"] = ctx;

    let v = 7;
    this.bullet = {
      vx: v * Math.cos(this.tank.angle * Math.PI / 180),
      vy: - v * Math.sin(this.tank.angle * Math.PI / 180),
      x: this.tank.x + (this.tank.w / 2),
      y: this.tank.y,
      ctx: ctx
    };
    console.log(this.bullet);
    this.firing = true;
  }

  bulletPhysics() {
    this.bullet.vy += 0.1;

    this.bullet.ctx.clearRect(0, 0, this.width, this.height);
    this.bullet.ctx.beginPath();
    this.bullet.ctx.arc(this.bullet.x, this.bullet.y, 3, 0, 2 * Math.PI, false);
    this.bullet.ctx.fillStyle = this.color;
    this.bullet.ctx.fill();
    this.bullet.ctx.closePath();

    let steps = Math.ceil(Math.pow(this.bullet.vy, 2) + Math.pow(this.bullet.vx, 2));
    for(let i = 0; i < steps; i += 1) {
      this.bullet.x += (this.bullet.vx / steps);
      this.bullet.y += (this.bullet.vy / steps);
      let grid = [[this.bullet.x, this.bullet.y]];
      if(this.level.collision({grid})) {
        this.level.explosion(this.canvases["terrain"], this.bullet.x, this.bullet.y);
        this.bullet.ctx.clearRect(0, 0, this.width, this.height);
        this.firing = false;
        this.bullet = {};
        break;
      }
    }
  }

  move_character() {
    if (this.spaceKey || this.firing) {
      if(!this.firing) {
        this.fireBullet();
      } else {
        this.bulletPhysics();
      }
    } else {
      if (this.aimLeft) this.tank.aim("left");
      if (this.aimRight) this.tank.aim("right");
      if (this.leftKey) this.tank.move("left")(this.level);
      if (this.rightKey) this.tank.move("right")(this.level);
    }

    this.tank.speed++;
    if (this.tank.speed > 0) {
        for (let i = 0; i < this.tank.speed; i++) {
            if (!this.level.collision(this.tank.hitbox(0, 10, 30, 1))) {
                this.tank.y += 1;
            } else {
                this.tank.speed = 0;
            }
        }
    }
    this.drawTank();
  }

  add_child(name, bitmap) {
    //stores the canvases in temporary obj to manipulate later
    var buffer = document.createElement('canvas');
    buffer.height = this.height;
    buffer.width = this.width;

    var ctx = buffer.getContext("2d");
    ctx.putImageData(bitmap.imageData, bitmap.x, bitmap.y);

    this.canvases[name] = ctx;
  }

  drawTank() {
    this.tank.draw();
    this.canvases["tank"] = this.tank.context;
    this.draw_objects();
  }

  draw_objects() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    Object.keys(this.canvases).forEach(key => {
      let obj = this.canvases[key];
      if (!!obj) this.ctx.drawImage(obj.canvas, 0, 0);
    })
  }

  keyChange(down) {
    return e => {
      let key = e.keyCode;
      if(key === 37) this.leftKey = down;
      if(key === 39) this.rightKey = down;
      if(key === 65) this.aimLeft = down;
      if(key === 68) this.aimRight = down;
      if(key === 32) this.spaceKey = down;
    }
  }
}
