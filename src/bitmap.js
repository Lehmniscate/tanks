export default class Bitmap {
  constructor(imageData) {
    this.imageData = imageData;
    this.height = this.imageData.height;
    this.minHeight = this.height / 3;
    this.width = this.imageData.width;
    this.x = 0;
    this.y = 0;
  }

  collision(hitbox, color) {
    color = color || "RGBA(50,175,50,255)";
    for(let i = 0; i < hitbox.grid.length; i++) {
      let x = Math.floor(hitbox.grid[i][0]);
      let y = Math.floor(hitbox.grid[i][1]);
      let pixel = this.getPixel(x, y);

      if(pixel === color) return true;
    }
    return false;
  }

  sinHeight(x) {
    let yOffset = (this.minHeight + this.height) / 2;
    let amplitude = (this.height - this.minHeight) / 2;
    let period = (((2 * Math.PI) / this.width) * (3 / 2));
    return ((amplitude)*Math.sin(period * x) + (yOffset));
  }

  fillColor(...colors) {
    for(let x = 0; x < this.imageData.width; x++) {
      let height = Math.floor(this.sinHeight(x));
      for(let y = height - this.minHeight; y < (this.height ); y++) {

        let idx = (x + y * this.width) * 4;
        for(let i = 0; i < 4; i++) {
          this.imageData.data[idx + i] = colors[i];
        }

      }
    }
  }

  getPixel(x, y) {
    x -= this.x;
    y -= this.y;
    let image = this.imageData;

    if(x < 0 || y < 0 ||
        x > image.width || y > image.height) return;

    let r = (y * image.width + x) * 4;

    return `RGBA(${image.data[r]},${image.data[r+1]},${image.data[r+2]},${image.data[r+3]})`;
  }
}
