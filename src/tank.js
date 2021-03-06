export default class Tank {
  constructor(x, y, color, canvas) {
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

  fire() {
    let v = this.power + 1;
    this.fuel = this.maxFuel;
    return {
      vx: v * Math.cos(this.angle * Math.PI / 180),
      vy: -v * Math.sin(this.angle * Math.PI / 180),
      x: this.x + (this.w / 2),
      y: this.y,
      radius: 50
    };
  }

  changePower(direction) {
    let change = 0;
    if(direction === "up") {
      change = 0.5;
    } else {
      change = -0.5;
    }

    return () => {
      this.power += change;
      if(this.power > this.maxPower) this.power = this.maxPower;
      if(this.power < 0) this.power = 0;
    }
  }

  move(direction) {
    let x;
    let outOfBounds;
    if(direction === "left") {
      direction = -1;
      x = 0;
      outOfBounds = () => this.x - 1 < 0;
    } else {
      direction = 1;
      x = this.w;
      outOfBounds = level => this.x + x + 1 > level.width;
    }

    return (level) => {
      if(this.fuel <= 0) return;
      if (!level.collision(this.hitbox(x, 0, 1, 1)) && !outOfBounds(level) ) {
        this.x += direction;
        this.fuel -= 1.5;
      }
      while (level.collision(this.hitbox(0, this.h, this.w, 1))) {
        this.y -= 1;
      }
    }
  }

  kill() {
    this.health = 0;
    this.out = true;
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

  explosion(x, y, radius) {
    if(this.health <= 0) return;
    let distance = Math.min(
      this.distance(x, y, this.x         , this.y),
      this.distance(x, y, this.x + this.w, this.y),
      this.distance(x, y, this.x         , this.y + this.h),
      this.distance(x, y, this.x + this.w, this.y + this.h)
    );
    if(distance < radius)
      this.health -= 50 - ((50 * distance) / radius);
    if(this.health < 0) this.health = 0;
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  draw(context) {
    if(this.out) return;

    if(this.health <= 0) {
      context.fillStyle = "rgba(0,0,0,150)";
      context.fillRect(this.x, this.y, this.w, this.h);
      return;
    }

    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.beginPath();
    context.arc(this.x + (this.w / 2), this.y, this.w / 4, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();

    context.translate(this.x + (this.w / 2), this.y)
    context.rotate(- this.angle * Math.PI / 180);
    context.fillRect(0, -2.5, this.w / 4 * 3, 5);
    context.rotate(this.angle * Math.PI / 180);
    context.translate(-(this.x + (this.w / 2)), - this.y)
  }

  drawHealth(context, offset) {
    context.fillStyle = this.color;
    context.fillText(`Player ${offset + 1}`, 10, 19 + 20*offset);
    context.fillRect(75, 10 + 20*offset, this.health, 10);
    context.strokeRect(75, 10 + 20*offset, this.maxHealth, 10)
  }

  drawStats(context, offset) {
    // Fuel
    context.fillStyle = this.color;
    context.fillText("Fuel: ", 195, 19 + 20*offset);
    context.strokeRect(220, 10 + 20*offset, this.maxFuel, 10);
    context.fillRect(220, 10 + 20*offset, this.fuel, 10);

    // Power
    let startX = 330;
    context.fillStyle = this.color;
    context.fillText("Power: ", startX, 19 + 20*offset);
    context.strokeRect(startX + 35, 10 + 20*offset, this.maxPower * 10, 10);
    context.fillRect(startX + 35, 10 + 20*offset, this.power * 10, 10);
  }

  drawTurnSymbol(context, offset) {
    context.fillStyle = this.color;
    context.strokeRect(6, 6 + 20*offset, 75 + this.maxHealth + 4, 18);

    // Floating indicator
    if(this.health < 0) this.health = 0;
    let d = new Date();
    let timeOffset = Math.sin(d.getTime() / 500) * 15;
    let timeWidth = Math.sin(d.getTime() / 350) * 7;
    let x0 = this.x + (this.w / 2);
    let y0 = this.y - 50 + timeOffset;
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

  alive() {
    return this.health > 0;
  }
}
