const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
// side  = measure of one standard smashy side, player side -  50, stabby ??
//changed side to 100 to make numbers more even
const side = 150;
let smashySpeed = 3;
const resetB = document.querySelector("#resetBtn");

// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// const gameLoopInterval = setInterval(gameLoop, 60);

class Sprite {
  constructor({ x, y, imageSrc, width, height }) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = width;
    this.height = height;
  }
  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.render();
  }
}

class Char {
  constructor(x, y, color, width, height, ABWidth, ABHeight, health, imageSrc) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.ABWidth = ABWidth;
    this.ABHeight = ABHeight;
    this.health = health;
    this.alive = true;
    this.attacking;
    this.image = new Image();
    this.image.src = imageSrc;
    // this.image = new Image();
    // this.image.src = imageSrc;

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
    if (this.health > 0) {
      ctx.drawImage(
        this.image,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
      // ctx.fillRect(
      //   this.x - this.width / 2,
      //   this.y - this.height / 2,
      //   this.width,
      //   this.height
      // );
    }

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
    } else if (
      this.attacking === true &&
      this.health > 0 &&
      player.health > 0
    ) {
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
  update() {
    this.render();
  }
  // attack state for the plater, timesout after 100ms so it doesnt  stick
  attackState = function () {
    player.attacking = true;

    setTimeout(() => {
      player.attacking = false;
    }, 100);

    // console.log(player.attackBox);
  };

  // checks if cpu boss is in range +- 100 x/y values to the player,  then attacks
  cpuAttackState() {
    if (smashy.health === 0) {
      return this.cpuAttackState;
    } else if (
      smashy.x - player.x <= 120 &&
      smashy.x - player.x >= -120 &&
      smashy.y - player.y >= -120 &&
      smashy.y - player.y <= 120 &&
      smashy.health > 0
    ) {
      // console.log("smashy in range");

      // smashy.attacking = true;

      setTimeout(smashyAttack, 1000);
      function smashyAttack() {
        smashy.attacking = true;
      }

      // if (smashy.attacking === true) {
      //   setTimeout(() => {
      //     smashy.attacking = true;
      //   }, 2000);
    } else {
      smashy.attacking = false;
      // console.log("smashy out of range?");
    }

    // smashy.attacking = false;
  }
}

// const throttle = (callback, delay) => {
//   let throttleTimeout = null;
//   let storedEvent = null;
//   const throttledEventHandler = (event) => {
//     storedEvent = event;

//     const shouldHandleEvent = !throttleTimeout;

//     if (shouldHandleEvent) {
//       callback(storedEvent);
//       storedEvent = null;

//       throttleTimeout = setTimeout(() => {
//         throttleTimeout = null;

//         if (storedEvent) {
//           throttledEventHandler(storedEvent);
//         }
//       }, delay);
//     }
//   };
//   return throttledEventHandler;
// };
// returnedFunction = throttle(attackState() {
//     attackState = function () {
//     player.attacking = true;

//     setTimeout(() => {
//       player.attacking = false;
//     }, 100);

//     // console.log(player.attackBox);
//   }
//   }, 500)
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
const background = new Sprite({
  x: 0,
  y: 0,
  width: 1000,
  height: 1000,
  imageSrc: "./img/background.png",
});

const player = new Char(
  475,
  650,
  "green",
  side / 2,
  side / 2,
  200,
  200,
  100,
  "./img/pfnn.png",
  {
    x: 475,
    y: 650,
    color: "green",
    width: side / 2,
    height: side / 2,
    ABWidth: 200,
    ABHeight: 200,
    health: 100,
    // imageSrc: "./img/pfnn.png",
    // attackBoxwidth: 500,
    // attackBoxheight: 500,
    attackBox: {
      x: this.x, // - 86,
      y: this.y, // - 86,
      width: 500,
      height: 150,
    },
  }
);
// const playerSprite = new Sprite({
//   x: player.x,
//   y: player.y,
//   width: player.width,
//   height: player.height,
// });

const smashy = new Char(
  400,
  200,
  "red",
  side,
  side,
  150,
  150,
  100,
  "./img/SPainted.png",
  {
    x: 400,
    y: 200,
    color: "red",
    width: side,
    height: side,
    ABWidth: 150,
    ABHeight: 150,
    health: 100,
    attackBox: {
      x: this.x, //- this.width,
      y: this.y, //- this.height,
      width: 900,
      height: 150,
    },
  }
);

const smashyMove = function () {
  let smashySpeed = 0.5;
  if (smashy.attacking === true) {
    smashySpeed = 0.5;
  } else if (player.y > smashy.y && player.x > smashy.x) {
    smashy.y += smashySpeed;
    smashy.attackBox.y += smashySpeed;
    smashy.x += smashySpeed;
    smashy.attackBox.x += smashySpeed;
  } else if (player.y < smashy.y && player.x < smashy.x) {
    smashy.y -= smashySpeed;
    smashy.attackBox.y -= smashySpeed;
    smashy.x -= smashySpeed;
    smashy.attackBox.x -= smashySpeed;
  } else if (player.y > smashy.y && player.x < smashy.x) {
    smashy.y += smashySpeed;
    smashy.attackBox.y += smashySpeed;
    smashy.x -= smashySpeed;
    smashy.attackBox.x -= smashySpeed;
  } else if (player.y < smashy.y && player.x > smashy.x) {
    smashy.y -= smashySpeed;
    smashy.attackBox.y -= smashySpeed;
    smashy.x += smashySpeed;
    smashy.attackBox.x += smashySpeed;
  } else if (player.x > smashy.x) {
    smashy.x += smashySpeed;
    smashy.attackBox.x += smashySpeed;
  } else if (player.x < smashy.x) {
    smashy.x -= smashySpeed;
    smashy.attackBox.x -= smashySpeed;
  } else if (player.y > smashy.y) {
    smashy.y += smashySpeed;
    smashy.attackBox.y += smashySpeed;
  } else if (player.y < smashy.y) {
    smashy.y -= smashySpeed;
    smashy.attackBox.y -= smashySpeed;
  }
};
// player.render();
// smashy.render();

let playerSpeed = 2;
const currentKeys = {};

function winCon() {
  if (player.health <= 0) {
    document.getElementById("vText").innerText = "You Died";
    document.getElementById("vText").style.color = "red";
    document.querySelector("#playerHealth").style.width = player.health + "%";
    // window.cancelAnimationFrame(animate);
    // cancelAnimation();
    // smashy.attacking = false;
    // smashySpeed = 0;
    // player.attacking = false;
    // playerSpeed = 0;
  } else if (smashy.health <= 0) {
    document.getElementById("vText").innerText = "Victory Achieved";
    document.getElementById("vText").style.color = "yellow";
    document.querySelector("#playerHealth").style.width = player.health + "%";
    // cancelAnimation();
    // smashy.attacking = false;
    // smashySpeed = 0;
    // player.attacking = false;
    // playerSpeed = 0;
  }
}
function cancelAnimation() {
  window.cancelAnimationFrame(animate);
}

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  player.render();

  // playerSprite.update();
  // console.log(currentKeys);
  if (player.health > 0) {
    if (currentKeys["ArrowUp"]) {
      player.y -= playerSpeed;
      player.attackBox.y -= playerSpeed;
    }
    if (currentKeys["ArrowDown"]) {
      player.y += playerSpeed;
      player.attackBox.y += playerSpeed;
    }
    if (currentKeys["ArrowLeft"]) {
      player.x -= playerSpeed;
      player.attackBox.x -= playerSpeed;
    }
    if (currentKeys["ArrowRight"]) {
      player.x += playerSpeed;
      player.attackBox.x += playerSpeed;
    }
  }
  // if (currentKeys[" "]) {
  //   player.attacking = true;
  //   setTimeout(() => {
  //     player.attacking = false;
  //   }, 100);
  // player.attackState();
  //}

  // do all the game logic
  // renderthe game objects
  //   detectHit();
  //   if (ogre.alive) {
  //     ogre.render();
  //   }
  smashyMove();
  // movementHandler();
  smashy.cpuAttackState();

  smashy.render();
  winCon();

  // movementAnimate();

  //player hit detection
  if (
    player.attacking === true &&
    player.attackBox.x + player.ABWidth / 2 >= smashy.x - smashy.width / 2 &&
    player.attackBox.x + player.ABWidth / 2 <= smashy.x + smashy.width &&
    player.y - player.ABHeight / 2 <= smashy.y + smashy.height / 2 &&
    player.y + player.ABHeight / 2 >= smashy.y - smashy.height / 2
    // player.attackBox.x <= smashy.x + smashy.width
    // player.attackBox.y + player.attackBox.height >= smashy.y
  ) {
    player.attacking = false;
    smashy.health -= 1.5;
    document.querySelector("#smashyHealth").style.width = smashy.health + "%";
    console.log(smashy.health);
    console.log(" left-side hit");
  } else if (
    player.attacking === true &&
    player.attackBox.x - player.ABWidth / 2 <= smashy.x + smashy.width / 2 &&
    player.attackBox.x - player.ABWidth / 2 >= smashy.x - smashy.width &&
    player.y - player.ABHeight / 2 <= smashy.y + smashy.height / 2 &&
    player.y + player.ABHeight / 2 >= smashy.y - smashy.height / 2
  ) {
    player.attacking = false;
    smashy.health -= 1.5;
    document.querySelector("#smashyHealth").style.width = smashy.health + "%";
    console.log(player.attacking);
    console.log("right-side hit");
  } else if (
    player.attacking === true &&
    player.attackBox.y - player.ABHeight / 2 <= smashy.y + smashy.height / 2 &&
    player.attackBox.y - player.ABHeight / 2 >= smashy.y - smashy.height &&
    player.x - player.ABWidth / 2 <= smashy.x + smashy.width / 2 &&
    player.x + player.ABWidth / 2 >= smashy.x - smashy.width / 2
  ) {
    player.attacking = false;
    smashy.health -= 1.5;
    document.querySelector("#smashyHealth").style.width = smashy.health + "%";
    console.log(smashy.health);
    console.log("bottom hit");
  } else if (
    player.attacking === true &&
    player.attackBox.y + player.ABHeight / 2 >= smashy.y - smashy.height / 2 &&
    player.attackBox.y + player.ABHeight / 2 <= smashy.y + smashy.height &&
    player.x - player.ABWidth / 2 <= smashy.x + smashy.width / 2 &&
    player.x + player.ABWidth / 2 >= smashy.x - smashy.width / 2
  ) {
    player.attacking = false;
    smashy.health -= 1.5;
    document.querySelector("#smashyHealth").style.width = smashy.health + "%";
    console.log("top hit");
  }

  //smashy hit detect
  if (player.health > 0) {
    if (
      smashy.attacking === true &&
      smashy.attackBox.x + smashy.ABWidth / 2 >= player.x - player.width / 2 &&
      smashy.attackBox.x + smashy.ABWidth / 2 <= player.x + player.width &&
      smashy.y - smashy.ABHeight / 2 <= player.y + player.height / 2 &&
      smashy.y + smashy.ABHeight / 2 >= player.y - player.height / 2
    ) {
      smashy.attacking = false;

      player.health -= 0.3;
      document.querySelector("#playerHealth").style.width = player.health + "%";
      console.log(player.health);
      console.log("right smash");
      // smashy.health -= 50;
      // console.log(smashy.health);
      // console.log(" left-side hit");
      // console.log(player.x, player.y);
      // console.log(player.attackBox.x);
    } else if (
      smashy.attacking === true &&
      smashy.attackBox.x - smashy.ABWidth / 2 <= player.x + player.width / 2 &&
      smashy.attackBox.x - smashy.ABWidth / 2 >= player.x - player.width &&
      smashy.y - smashy.ABHeight / 2 <= player.y + player.height / 2 &&
      smashy.y + smashy.ABHeight / 2 >= player.y - player.height / 2
    ) {
      smashy.attacking = false;
      player.health -= 0.3;

      document.querySelector("#playerHealth").style.width = player.health + "%";
      console.log("left smash");
      // player.attacking = false;
      // smashy.health -= 50;
      // console.log(smashy.health);
      // console.log(player.attacking);
      // console.log("right-side hit");
    } else if (
      smashy.attacking === true &&
      smashy.attackBox.y - smashy.ABHeight / 2 <=
        player.y + player.height / 2 &&
      smashy.attackBox.y - smashy.ABHeight / 2 >= player.y - player.height &&
      smashy.x - smashy.ABWidth / 2 <= player.x + player.width / 2 &&
      smashy.x + smashy.ABWidth / 2 >= player.x - player.width
    ) {
      // smashy.attacking = false;
      player.health -= 0.3;
      document.querySelector("#playerHealth").style.width = player.health + "%";
      console.log("top smash");
      // player.attacking = false;
      // smashy.health -= 50;
      // console.log(smashy.health);
      // console.log("bottom hit");
    } else if (
      smashy.attacking === true &&
      smashy.attackBox.y + smashy.ABHeight / 2 >=
        player.y - player.height / 2 &&
      smashy.attackBox.y + smashy.ABHeight / 2 <= player.y + player.height &&
      smashy.x - smashy.ABWidth / 2 <= player.x + player.width / 2 &&
      smashy.x + smashy.ABWidth / 2 >= player.x - player.width
    ) {
      // smashy.attacking = false;
      player.health -= 0.3;
      document.querySelector("#playerHealth").style.width = player.health + "%";
      console.log("bottom smash");
      // player.attacking = false;
      // smashy.health -= 50;
      // console.log(smashy.health);
      // console.log("top hit");
    }
  }
}
// console.log(smashy.ABHeight, smashy.attackBox.x, smashy.attackBox.y);

animate();
// function resetButton() {}
console.log(document.getElementById("resetBtn"));
document.getElementById("resetBtn").addEventListener("click", function () {
  resetGame();
  document.getElementById("resetBtn").blur();
  console.log("reset?");
});

document.addEventListener("keydown", movementHandler);
function movementHandler(e) {
  // console.log(e);
  currentKeys[e.key] = true;

  // switch (e.key) {
  //   case "ArrowUp":
  //     playerSpeed = 24;
  //     player.y = player.y - playerSpeed;
  //     player.attackBox.y = player.attackBox.y - playerSpeed;
  //     break;
  //   // case "w" && "a":
  //   //   player.y = player.y - playerSpeed;
  //   //   player.x = player.x - playerSpeed;
  //   //   break;
  //   case "ArrowDown":
  //     playerSpeed = 24;
  //     player.y = player.y + playerSpeed;
  //     player.attackBox.y = player.attackBox.y + playerSpeed;
  //     break;
  //   case "ArrowLeft":
  //     playerSpeed = 24;
  //     // console.log(e.key);
  //     player.x = player.x - playerSpeed;
  //     player.attackBox.x = player.attackBox.x - playerSpeed;
  //     break;
  //   case "ArrowRight":
  //     playerSpeed = 24;
  //     player.x = player.x + playerSpeed;
  //     player.attackBox.x = player.attackBox.x + playerSpeed;
  //     break;

  //   case " ":
  //     player.attackState();
  //     // console.log("attacking");

  //     break;
  //}
}
document.addEventListener("keypress", attackOnly);
function attackOnly(e) {
  if (player.health > 0) {
    switch (e.key) {
      case " ":
        player.attackState();
    }
  }
}

document.addEventListener("keyup", stopMovement);
function stopMovement(e) {
  //   console.log(e.key);
  currentKeys[e.key] = false;
  // switch (e.key) {
  //   case "ArrowUp":
  //   playerSpeed = 0;
  //   // player.y = player.y - playerSpeed;
  //   break;
  // // case "w" && "a":
  // //   player.y = player.y - playerSpeed;
  // //   player.x = player.x - playerSpeed;
  // //   break;
  // case "ArrowDown":
  //   playerSpeed = 0;
  //   // player.y = player.y + playerSpeed;
  //   break;
  // case "ArrowLeft":
  //   playerSpeed = 0;

  //   // player.x = player.x - playerSpeed;
  //   break;
  // case "ArrowRight":
  //   // console.log(e.key);
  //   playerSpeed = 0;
  //   // player.x = player.x + playerSpeed;
  //   break;
}
//}

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
const resetGame = function () {
  console.log("resetgamepls");
  player.x = 475;
  player.attackBox.x = 475;
  player.y = 650;
  player.attackBox.y = 650;
  player.health = 100;
  smashy.x = 400;
  smashy.attackBox.x = 400;
  smashy.attackBox.y = 200;
  smashy.y = 200;
  smashy.health = 100;
  document.getElementById("vText").innerText = " ";
  document.querySelector("#smashyHealth").style.width = smashy.health + "%";
  document.querySelector("#playerHealth").style.width = player.health + "%";
  console.log(player.health, smashy.health);
};
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
