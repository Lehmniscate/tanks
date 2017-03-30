
export default class Tank {
  constructor(x, y, color, canvas) {
    this.cannonAngle = 0;
    this.angle = 0;
    this.color = color || "rgb(50,100,150)";
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 10;
    this.speed = 0;

    let buffer = document.createElement('canvas');
    buffer.height = canvas.height;
    buffer.width = canvas.width;
    let ctx = buffer.getContext("2d");
    this.context = ctx;
  }

  aim(direction) {
    if(direction === "left") {
      if(this.angle < 180) this.angle += 0.5;
    } else {
      if(this.angle > 0) this.angle -= 0.5;
    }
  }

  move(direction) {
    let x;
    if(direction === "left") {
      direction = -1;
      x = 0;
    } else {
      direction = 1;
      x = this.w;
    }

    return (level) => {
      if (!level.collision(this.hitbox(x, 0, 1, 1))) {
        this.x += direction;
      }
      while (level.collision(this.hitbox(0, this.h, this.w, 1))) {
        this.y -= 1;
      }
    }
  }

  hitbox(xOffset, yOffset, w, h) {
    let x = this.x + xOffset;
    let y = this.y + yOffset;
    let grid = [];
    for(let i = 0; i < w; i++) {
      for(let j = 0; j < h; j++) {
        grid.push([x + i, y + j]);
      }
    }
    return {grid};
  }

  draw() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.w, this.h);
    this.context.beginPath();
    this.context.arc(this.x + (this.w / 2), this.y, this.w / 4, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();

    this.context.translate(this.x + (this.w / 2), this.y)
    this.context.rotate(- this.angle * Math.PI / 180);
    this.context.fillRect(0, -2.5, this.w, 5);
    this.context.rotate(this.angle * Math.PI / 180);
    this.context.translate(-(this.x + (this.w / 2)), - this.y)
  }
}
