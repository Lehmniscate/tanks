import Bitmap from './bitmap';

export default class Level {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.terrain_bitmap = new Bitmap(this.ctx.createImageData(this.width, this.height / 2));
    this.terrain_bitmap.fillColor(50, 175, 50, 255);
  }

  collision(hitbox) {
    return this.terrain_bitmap.collision(hitbox);
  }
}
