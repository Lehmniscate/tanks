
export default class Tank {
  constructor(x, y, color) {
    this.cannonAngle = 0;
    this.angle = 0;
    this.color = color || "rgb(50,100,150)";
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 20;
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

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
  }
}
