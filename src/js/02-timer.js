import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('[data-start]');
// const stopButton = document.querySelector('[data-stop]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
const inputData = document.querySelector('#datetime-picker');

startButton.disabled = true;

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = convertMs(deltaTime);
      updateClockFace(time);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};

// timer.start();

startButton.addEventListener('click', () => {
  timer.start();
});
// stopButton.addEventListener('click', () => {
//   timer.stop();
// });

function updateClockFace({ days, hours, minutes, seconds }) {
  daysDisplay.textContent = days;
  hoursDisplay.textContent = hours;
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
  },
};

flatpickr(inputData, options);

console.log(4);
