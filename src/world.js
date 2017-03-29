import Level from './level';
import Tank from './tank';
import Bitmap from './bitmap';

export default class World {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvases = {};
    this.level = new Level(this.ctx, this.width, this.height);
    this.level.terrain_bitmap.y = this.height - this.level.terrain_bitmap.height;

    this.tank = new Tank(20, 20);

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
    requestAnimationFrame(this.loop.bind(this));
  }

  move_character() {
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
    let buffer = document.createElement('canvas');
    buffer.height = this.height;
    buffer.width = this.width;

    let ctx = buffer.getContext("2d");
    this.tank.draw(ctx);
    this.canvases["tank"] = ctx;

    this.draw_objects();
  }

  draw_objects() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (var key in this.canvases) {
      var obj = this.canvases[key];
      if (obj) this.ctx.drawImage(obj.canvas, 0, 0);
    }
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
