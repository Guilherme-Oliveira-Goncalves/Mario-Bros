const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".restart-button");
const clouds = document.querySelector(".clouds");
const dino1 = document.querySelector(".dinossauro");
const dino2 = document.querySelector(".dino_dois");

let score = 0;
let isGameOver = false;
let gameLoop;

const updateScore = () => {
  score += 1;
  scoreDisplay.textContent = score;
};

const jump = () => {
  mario.classList.add("jump");
  const jumpAudio = document.getElementById("jump-audio");
  jumpAudio.currentTime = 0;
  jumpAudio.volume = 0.2;
  jumpAudio.play();

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

document.addEventListener("touchstart", () => {
  jump();
});

let loopCount = 0;
const loop = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  const cloudsPosition = clouds.offsetLeft;

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    clouds.style.animation = "none";
    clouds.style.left = `${cloudsPosition}px`;

    mario.src = "game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    gameOver();
  } else {
    loopCount += 1;
    if (loopCount % 10 === 0) {
      updateScore();
    }
    if (!isGameOver) {
      gameLoop = requestAnimationFrame(loop);
    }
  }
};

function gameOver() {
  isGameOver = true;
  cancelAnimationFrame(gameLoop);
  restartButton.style.display = "block";
  const mario_isdeadaudio = document.getElementById("mario_death");
  mario_isdeadaudio.currentTime = 0;
  mario_isdeadaudio.volume = 0.2;
  mario_isdeadaudio.play();
}

function restartGame() {
  location.reload();
}

document.addEventListener("keydown", jump);
restartButton.addEventListener("click", restartGame);
gameLoop = requestAnimationFrame(loop);
