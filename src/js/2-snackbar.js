import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const delay = document.querySelector('input[name="delay"]').value;
    const radio = document.querySelector('input[name="state"]:checked');
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radio.value === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, +delay);
    });
    promise
        .then(delay => massageSuccess(delay))
        .catch(delay => massageError(delay));
    
    function massageError() {
    iziToast.error({
        title: 'Error',
        titleColor: 'white',
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight'
});
}

function massageSuccess() {
    iziToast.success({
    title: 'OK',
    titleColor: 'white',
    message: `✅ Fulfilled promise in ${delay}ms`,
    messageColor: 'white',
        backgroundColor: 'green',
        position: 'topRight'
    });
}
});