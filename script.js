const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 750;
// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

const gameLoopInterval = setInterval(gameLoop, 60);

class Char {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.attacking;

    this.attackBox = {
      x: this.x,
      y: this.y,
      width: 150,
      height: 150,
    };
  }

  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    //maybe  translates the rect?

    ctx.transform = "translate(-50px -50px)";
    // attack box fillrect, only active during attack
    if (this.attacking === true) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(
        this.x,
        this.y,
        //attack box if pointing  directionally
        // this.x + this.width / 3.5,
        // this.y + this.height / 2,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  // attack state for the plater, timesout after 100ms so it doesnt  stick
  attackState() {
    this.attacking = true;
    setTimeout(() => {
      this.attacking = false;
    }, 100);
  }

  // checks if cpu boss is in range +- 100 x/y values to the player,  then attacks
  cpuAttackState() {
    if (
      smashy.x - player.x < 100 &&
      smashy.x - player.x > -100 &&
      smashy.y - player.y > -100 &&
      smashy.y - player.y < 100
    ) {
      console.log("smashy in range");
      smashy.attacking = true;
      setTimeout(() => {
        this.attacking = false;
      }, 100);
    }

    // switch (e.key) {
    //   case " ":
    // renderAttack() {
    //   ctx.fillStyle = "yellow";
    //   ctx.fillRect(
    //     this.x,
    //     this.y,
    //     //attack box if pointing  directionally
    //     // this.x + this.width / 3.5,
    //     // this.y + this.height / 2,
    //     this.attackBox.width,
    //     this.attackBox.height
  }
}

// creating character object from Char
const player = new Char(475, 650, "green", 110, 50);
const smashy = new Char(400, 50, "red", 110, 110);
// player.render();
// smashy.render();

document.addEventListener("keydown", movementHandler);
function movementHandler(e) {
  //   console.log(e.key);
  const playerSpeed = 9;
  const smashySpeed = 3;

  switch (e.key) {
    case "w":
      player.y = player.y - playerSpeed;
      break;
    // case "w" && "a":
    //   player.y = player.y - playerSpeed;
    //   player.x = player.x - playerSpeed;
    //   break;
    case "s":
      player.y = player.y + playerSpeed;
      break;
    case "a":
      player.x = player.x - playerSpeed;
      break;
    case "d":
      player.x = player.x + playerSpeed;
      break;

    case " ":
      player.attackState();
      console.log("attacking");

      break;
  }
}
// }

function gameLoop() {
  // clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // do all the game logic
  // renderthe game objects
  //   detectHit();
  //   if (ogre.alive) {
  //     ogre.render();
  //   }
  if (player.y > smashy.y && player.x > smashy.x) {
    smashy.y += 3;
    smashy.x += 3;
  } else if (player.y < smashy.y && player.x < smashy.x) {
    smashy.y -= 3;
    smashy.x -= 3;
  } else if (player.y > smashy.y && player.x < smashy.x) {
    smashy.y += 3;
    smashy.x -= 3;
  } else if (player.y < smashy.y && player.x > smashy.x) {
    smashy.y -= 3;
    smashy.x += 3;
  } else if (player.x > smashy.x) {
    smashy.x += 3;
  } else if (player.x < smashy.x) {
    smashy.x -= 3;
  } else if (player.y > smashy.y) {
    smashy.y += 3;
  } else if (player.y < smashy.y) {
    smashy.y -= 3;
  }
  // else if (player.y > smashy.y && player.x > smashy.x) {
  //     smashy.y += 3;
  //     smashy.x += 3;
  //   }
  smashy.cpuAttackState();
  player.render();
  smashy.render();
  // player.attackBox.render();
}

// creating boss 'smashy' from Char
// const smashy = new Char({
//   x: 150,
//   y: 50,
// });
console.log(player);
console.log(smashy);
