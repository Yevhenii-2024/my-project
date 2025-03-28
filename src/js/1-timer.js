
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const time = document.querySelectorAll('.value');

let userSelectedDate;
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const now = new Date();
      if (userSelectedDate <= now) {
          massageError();
          btn.disabled = true;
          return;
      }
      btn.disabled = false;
  },
};
function massageError() {
    iziToast.error({
        title: 'Error',
        titleColor: 'white',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight'
});
}

btn.addEventListener('click', startTimer);

function startTimer() {
  const intervalId = setInterval(() => {
      const now = new Date();
      const timer = userSelectedDate - now;
      if (timer <= 0) {
          clearInterval(intervalId); 
          btn.disabled = false;
          input.disabled = false;
          return;
      }
      const convertTime = convertMs(timer);
      updateSpan(convertTime);
      btn.disabled = true;
      input.disabled = true;
      
    }, 1000);
}

function updateSpan(timer) {
    timer.forEach((elements, index) => {
        time[index].textContent = addLeadingZero(elements);
    });
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

flatpickr('#datetime-picker', options);



function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return [ days, hours, minutes, seconds ];
}

