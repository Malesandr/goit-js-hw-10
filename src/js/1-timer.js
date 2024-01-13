import flatpickr from "flatpickr";
import iziToast from "izitoast";

const timerValue = {
    startButtonTimer: document.querySelector('[data-start]'),
    timerDd: document.querySelector('[data-days]'),
    timerHh: document.querySelector('[data-hours]'),
    timerMin: document.querySelector('[data-minutes]'),
    timerSec: document.querySelector('[data-seconds]'),
  };
  
  timerValue.startButtonTimer.disabled = true;
  let timerId = null;
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
      const currentDate = new Date();
  
      if (selectedDates[0] - currentDate < 0) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
        timerValue.startButtonTimer.disabled = true;
    } else {
        timerValue.startButtonTimer.disabled = false;
    }
      }
    };
  
  function convert(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }
  
  const timer = flatpickr('#datetime-picker', options);

  function TimerStart() {
    const selectedDate = timer.selectedDates[0];
  
    timerId = setInterval(() => {
      const startTime = new Date();
      const startCountDown = selectedDate - startTime;
      timerValue.startButtonTimer.disabled = true;
  
      if (startCountDown < 0) {
        clearInterval(timerId);
        return;
      }
      updateTimer(convert(startCountDown));
    }, 1000);
  }
  
  function updateTimer({ days, hours, minutes, seconds }) {
    timerValue.timerDd.textContent = addLeadingZero(days);
    timerValue.timerHh.textContent = addLeadingZero(hours);
    timerValue.timerMin.textContent = addLeadingZero(minutes);
    timerValue.timerSec.textContent = addLeadingZero(seconds);
  }
  
  timerValue.startButtonTimer.addEventListener('click', TimerStart);