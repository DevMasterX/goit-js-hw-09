const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

function startChangeColor() {
  if (!timerId) {
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

function stopChangeColor() {
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
