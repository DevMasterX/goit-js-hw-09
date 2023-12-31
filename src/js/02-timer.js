import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
const inputData = document.querySelector('#datetime-picker');

startButton.disabled = true;

const timer = {
  intervalId: null,

  start() {
    inputData.disabled = true;

    this.intervalId = setInterval(() => {
      const selectedData = new Date(inputData.value);
      const currentTime = Date.now();
      const deltaTime = selectedData - currentTime;
      const time = convertMs(deltaTime);
      updateClockFace(time);
      if (deltaTime < 10000) {
        secondsDisplay.classList.add('red');
      }
      if (deltaTime < 1000) {
        Notify.success('The timer has expired');
        clearInterval(this.intervalId);
        inputData.disabled = false;
        secondsDisplay.classList.remove('red');
      }
      startButton.removeEventListener('click', onstartCountClick);
    }, 1000);
  },
};

startButton.addEventListener('click', onstartCountClick);

function onstartCountClick() {
  timer.start();
}

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
