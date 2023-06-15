const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".restart-button");
let score = 0;
let isGameOver = false;
let gameLoop;

const updateScore = () => {
  score += 1;
  scoreDisplay.textContent = score;
};

const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    gameOver();
  } else {
    checkPlacar();
    if (!isGameOver) {
      gameLoop = requestAnimationFrame(loop);
    }
  }
};

const checkPlacar = () => {
  const marioRight = mario.offsetLeft + mario.offsetWidth;
  const pipeLeft = pipe.offsetLeft;

  if (
    marioRight > pipeLeft &&
    marioRight <= pipeLeft + 2 &&
    mario.classList.contains("jump")
  ) {
    updateScore();
  }
};

function gameOver() {
  isGameOver = true;
  cancelAnimationFrame(gameLoop);
  restartButton.style.display = "block";
}

function restartGame() {
  location.reload();
}

document.addEventListener("keydown", jump);
restartButton.addEventListener("click", restartGame);
gameLoop = requestAnimationFrame(loop);
