export default class Player {
  constructor(tank, fireBullet, world, ai = false) {
    this.tank = tank;
    this.fireBullet = fireBullet;
    this.world = world;
    this.ai = ai
    this.moving = false;
    this.waiting = 50;
  }

  move(level) {
    if(this.ai) {
      if (this.motion) {
        if (this.aiming < 0) {
          this.tank.aim("left");
          this.aiming += 1;
        } else if (this.aiming > 0) {
          this.tank.aim("right");
          this.aiming -= 1;
        }
        if (this.moving < 0) {
          this.tank.move("left")(level);
          this.moving += 1;
        } else if (this.moving > 0) {
          this.tank.move("right")(level);
          this.moving -= 1;
        }
        if (this.powering < 0) {
          this.tank.changePower("up")();
          this.powering += 1;
        } else if (this.powering > 0) {
          this.tank.changePower("down")();
          this.powering -= 1;
        }
        if (this.powering === 0 && this.moving === 0 && this.aiming === 0) {
          this.fireBullet();
          this.motion = false;
          this.waiting = 50;
        }
      } else {
        if(this.waiting === 0) {
          this.motion = true
          this.aiming = Math.floor(Math.random() * 500 - 250);
          this.moving = Math.floor(Math.random() * 50 - 25);
          this.powering = Math.floor(Math.random() * 10 - 5);
        } else {
          this.waiting--;
        }
      }
    } else {
      if (this.world.aimLeft) this.tank.aim("left");
      if (this.world.aimRight) this.tank.aim("right");
      if (this.world.leftKey) this.tank.move("left")(level);
      if (this.world.rightKey) this.tank.move("right")(level);
      if (this.world.powerUp) this.tank.changePower("up")();
      if (this.world.powerDown) this.tank.changePower("down")();
      if (this.world.spaceKey) this.fireBullet();
    }
  }

  physics(level) {
    this.tank.speed++;
    if(this.tank.speed > 0) {
      for(let i = 0; i < this.tank.speed; i++) {
        if(!this.tank.out && !level.collision(this.tank.hitbox(0, 10, 30, 1))) {
          this.tank.y += 1;
        } else {
          this.tank.speed = 0;
        }
      }
      if (this.world.outOfBounds(this.tank.x, this.tank.y) && this.tank.alive()) {
        this.tank.kill();
        this.world.nextTurn();
      }
    }
  }
}
