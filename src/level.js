import Bitmap from './bitmap';

export default class Level {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    let buffer = document.createElement('canvas');
    buffer.height = this.height;
    buffer.width = this.width;
    this.ctx = buffer.getContext("2d");

    this.terrain_bitmap = new Bitmap(this.ctx.createImageData(this.width, this.height / 2));
    this.terrain_bitmap.fillColor(50, 175, 50, 255);
    this.terrain_bitmap.y = this.height - this.terrain_bitmap.height;

    this.ctx.putImageData(this.terrain_bitmap.imageData, this.terrain_bitmap.x, this.terrain_bitmap.y);
  }

  draw(context) {
    context.drawImage(this.ctx.canvas, 0, 0);
  }

  collision(hitbox) {
    return this.terrain_bitmap.collision(hitbox);
  }

  explosion(x, y, r) {
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
}
