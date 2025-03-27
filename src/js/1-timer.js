
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

flatpickr('#datetime-picker', options);
