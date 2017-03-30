import Bitmap from './bitmap';

export default class Level {
  constructor(ctx, width, height) {
    this.width = width;
    this.height = height;

    this.terrain_bitmap = new Bitmap(ctx.createImageData(this.width, this.height / 2));
    this.terrain_bitmap.fillColor(50, 175, 50, 255);
    this.terrain_bitmap.y = this.height - this.terrain_bitmap.height;

    let buffer = document.createElement('canvas');
    buffer.height = this.height;
    buffer.width = this.width;
    this.ctx = buffer.getContext("2d");
    this.ctx.putImageData(this.terrain_bitmap.imageData, this.terrain_bitmap.x, this.terrain_bitmap.y);
  }

  collision(hitbox) {
    return this.terrain_bitmap.collision(hitbox);
  }

  explosion(ctx, x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2, true);
    ctx.fillStyle = "rgba(255, 255, 255, 255)";
    ctx.fill();
    ctx.closePath();

    //update
    var newCanvasData = ctx.getImageData(this.terrain_bitmap.x, this.terrain_bitmap.y, this.terrain_bitmap.width, this.terrain_bitmap.height);
    this.terrain_bitmap.imageData = newCanvasData;
    ctx.putImageData(newCanvasData, this.terrain_bitmap.x, this.terrain_bitmap.y);
  }
}
