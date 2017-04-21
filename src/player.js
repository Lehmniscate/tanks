export default class Player {
  constructor(tank, fireBullet, world, ai = false) {
    this.tank = tank;
    this.fireBullet = fireBullet;
    this.world = world;
    this.ai = ai
  }

  move(level) {
    if(this.ai) {

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
