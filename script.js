const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 750;
// side  = measure of one standard smashy side, player side -  50, stabby ??
//changed side to 100 to make numbers more even
const side = 100;
let smashySpeed = 3;

// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// const gameLoopInterval = setInterval(gameLoop, 60);

class Char {
  constructor(x, y, color, width, height, ABWidth, ABHeight) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.ABWidth = ABWidth;
    this.ABHeight = ABHeight;
    this.alive = true;
    this.attacking;
    this.health;
    this.attackBox = {
      x,
      y,
      width,
      height,
      // x: x,
      // y: y,
      // width: 150,
      // height: 150,
    };
    // attackBox: x, y;
    // this.attackBoxwidth;
    // this.attackBoxheight;

    // this.attackBox = {
    //   x: this.x - this.width / 2,
    //   y: this.y - this.height / 2,
    //   width: this.attackBoxwidth,
    //   height: this.attackBoxheight,
    // };
  }

  render() {
    // console.log(player.x, player.y, smashy.x, smashy.y);
    ctx.fillStyle = this.color;
    //side is 110. side / 2 = 55
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );

    // attack box fillrect, only active during attack
    if (this.attacking === true && this === player) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(
        this.x - 100,
        this.y - 100,
        // this.x - 86,
        // this.y - 86,
        //attack box if pointing  directionally
        // this.x + this.width / 3.5,
        // this.y + this.height / 2,
        // 500,
        // 500
        this.ABWidth,
        this.ABHeight
        // this.attackBox.width,
        // this.attackBox.height
      );
    } else if (this.attacking === true) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(
        this.x - 75,
        this.y - 75,
        // this.x - this.width,
        // this.y - this.height,
        // this.width + 90,
        // this.height + 90
        this.ABWidth,
        this.ABHeight
      );
    }
  }

  // attack state for the plater, timesout after 100ms so it doesnt  stick
  attackState() {
    player.attacking = true;
    setTimeout(() => {
      player.attacking = false;
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
      // console.log("smashy in range");

      smashy.attacking = true;

      // setTimeout(() => {
      //   smashy.attacking = false;
      // }, 200);
    } else {
      smashy.attacking = false;
      // console.log("smashy out of range?");
    }

    // smashy.attacking = false;
  }
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

// creating character object from Char
// smashy starting slight right to make room for stabby?
// const player = new Char(475, 650, "green", side / 2, side / 2, 500, 500);
const player = new Char(475, 650, "green", side / 2, side / 2, 200, 200, {
  x: 475,
  y: 650,
  color: "green",
  width: side / 2,
  height: side / 2,
  ABWidth: 200,
  ABHeight: 200,
  // attackBoxwidth: 500,
  // attackBoxheight: 500,
  attackBox: {
    x: this.x, // - 86,
    y: this.y, // - 86,
    width: 500,
    height: 150,
  },
});

const smashy = new Char(400, 200, "red", side, side, 150, 150, {
  // attackBoxwidth: 500,
  // attackBoxheight: 500,
  attackBox: {
    x: this.x, //- this.width,
    y: this.y, //- this.height,
    width: 900,
    height: 150,
  },
});

const smashyMove = function () {
  let smashySpeed = 0.4;
  if (smashy.attacking === true) {
    smashySpeed = 0;
  } else if (player.y > smashy.y && player.x > smashy.x) {
    smashy.y += smashySpeed;
    smashy.x += smashySpeed;
  } else if (player.y < smashy.y && player.x < smashy.x) {
    smashy.y -= smashySpeed;
    smashy.x -= smashySpeed;
  } else if (player.y > smashy.y && player.x < smashy.x) {
    smashy.y += smashySpeed;
    smashy.x -= smashySpeed;
  } else if (player.y < smashy.y && player.x > smashy.x) {
    smashy.y -= smashySpeed;
    smashy.x += smashySpeed;
  } else if (player.x > smashy.x) {
    smashy.x += smashySpeed;
  } else if (player.x < smashy.x) {
    smashy.x -= smashySpeed;
  } else if (player.y > smashy.y) {
    smashy.y += smashySpeed;
  } else if (player.y < smashy.y) {
    smashy.y -= smashySpeed;
  }
};
// player.render();
// smashy.render();

let playerSpeed = 8;

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // do all the game logic
  // renderthe game objects
  //   detectHit();
  //   if (ogre.alive) {
  //     ogre.render();
  //   }
  // smashyMove();
  // movementHandler();
  smashy.cpuAttackState();
  player.render();
  smashy.render();
  // movementAnimate();

  if (
    player.attacking === true &&
    player.attackBox.x + player.ABWidth / 2 >= smashy.x - smashy.width / 2 &&
    player.attackBox.x + player.ABWidth <= smashy.x + smashy.width &&
    player.y - player.ABHeight / 2 <= smashy.y + smashy.height / 2 &&
    player.y + player.ABHeight / 2 >= smashy.y - smashy.height / 2
    // player.attackBox.x <= smashy.x + smashy.width
    // player.attackBox.y + player.attackBox.height >= smashy.y
  ) {
    console.log(" left-side hit");
    console.log(player.x, player.y);
    console.log(player.attackBox.x);
  } else if (
    player.attacking === true &&
    player.attackBox.x - player.ABWidth / 2 <= smashy.x + smashy.width / 2
  ) {
    console.log("right-side hit");
  }
}

animate();

document.addEventListener("keydown", movementHandler);
function movementHandler(e) {
  //   console.log(e.key);

  switch (e.key) {
    case "ArrowUp":
      playerSpeed = 24;
      player.y = player.y - playerSpeed;
      player.attackBox.y = player.attackBox.y - playerSpeed;
      break;
    // case "w" && "a":
    //   player.y = player.y - playerSpeed;
    //   player.x = player.x - playerSpeed;
    //   break;
    case "ArrowDown":
      playerSpeed = 24;
      player.y = player.y + playerSpeed;
      player.attackBox.y = player.attackBox.y + playerSpeed;
      break;
    case "ArrowLeft":
      playerSpeed = 24;
      // console.log(e.key);
      player.x = player.x - playerSpeed;
      player.attackBox.x = player.attackBox.x - playerSpeed;
      break;
    case "ArrowRight":
      playerSpeed = 24;
      player.x = player.x + playerSpeed;
      player.attackBox.x = player.attackBox.x + playerSpeed;
      break;

    case " ":
      player.attackState();
      // console.log("attacking");

      break;
  }
}
document.addEventListener("keyup", stopMovement);
function stopMovement(e) {
  //   console.log(e.key);

  switch (e.key) {
    case "ArrowUp":
      playerSpeed = 0;
      // player.y = player.y - playerSpeed;
      break;
    // case "w" && "a":
    //   player.y = player.y - playerSpeed;
    //   player.x = player.x - playerSpeed;
    //   break;
    case "ArrowDown":
      playerSpeed = 0;
      // player.y = player.y + playerSpeed;
      break;
    case "ArrowLeft":
      playerSpeed = 0;

      // player.x = player.x - playerSpeed;
      break;
    case "ArrowRight":
      // console.log(e.key);
      playerSpeed = 0;
      // player.x = player.x + playerSpeed;
      break;
  }
}

//detect collision
// if (player.att)
// function gameLoop() {
//   // clear the canvas
//   ctx.fillStyle = "black";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   // do all the game logic
//   // renderthe game objects
//   //   detectHit();
//   //   if (ogre.alive) {
//   //     ogre.render();
//   //   }
//   smashyMove();

//   smashy.cpuAttackState();
//   player.render();
//   smashy.render();
//   movementAnimate();

//   // player.attackBox.render();
// }

// creating boss 'smashy' from Char
// const smashy = new Char({
//   x: 150,
//   y: 50,
// });
console.log(player);
console.log(smashy);

// const smashyMove = function () {
//   let smashySpeed = 3;
//   if (smashy.attacking === true) {
//     smashySpeed = 0;
//   } else if (player.y > smashy.y && player.x > smashy.x) {
//     smashy.y += smashySpeed;
//     smashy.x += smashySpeed;
//   } else if (player.y < smashy.y && player.x < smashy.x) {
//     smashy.y -= smashySpeed;
//     smashy.x -= smashySpeed;
//   } else if (player.y > smashy.y && player.x < smashy.x) {
//     smashy.y += smashySpeed;
//     smashy.x -= smashySpeed;
//   } else if (player.y < smashy.y && player.x > smashy.x) {
//     smashy.y -= smashySpeed;
//     smashy.x += smashySpeed;
//   } else if (player.x > smashy.x) {
//     smashy.x += smashySpeed;
//   } else if (player.x < smashy.x) {
//     smashy.x -= smashySpeed;
//   } else if (player.y > smashy.y) {
//     smashy.y += smashySpeed;
//   } else if (player.y < smashy.y) {
//     smashy.y -= smashySpeed;
//   }
// };

// if (player.y > smashy.y && player.x > smashy.x) {
//   smashy.y += 3;
//   smashy.x += 3;
// } else if (player.y < smashy.y && player.x < smashy.x) {
//   smashy.y -= 3;
//   smashy.x -= 3;
// } else if (player.y > smashy.y && player.x < smashy.x) {
//   smashy.y += 3;
//   smashy.x -= 3;
// } else if (player.y < smashy.y && player.x > smashy.x) {
//   smashy.y -= 3;
//   smashy.x += 3;
// } else if (player.x > smashy.x) {
//   smashy.x += 3;
// } else if (player.x < smashy.x) {
//   smashy.x -= 3;
// } else if (player.y > smashy.y) {
//   smashy.y += 3;
// } else if (player.y < smashy.y) {
//   smashy.y -= 3;
// }
// else if (player.y > smashy.y && player.x > smashy.x) {
//     smashy.y += 3;
//     smashy.x += 3;
//   }
