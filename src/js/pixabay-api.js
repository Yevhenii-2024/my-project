import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createMarkup, changeLoader } from './render-functions';

export function getRequest(searchData) {
    axios.get(`https://pixabay.com/api/`, {
        params: {
            key: '49667356-c9b78f361687dff4f3855c0b0',
            q: `${searchData}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true
        }
    })
        .then(res => checkData(res.data.hits))
        .catch(error => massageError(error.message))
        .finally(() => changeLoader('none'));
}

function checkData(data) {
    if (!data.length) {
        massageError();
        return;
    }
    createMarkup(data);
}

export function massageError() {
    iziToast.error({
        title: 'Error',
        titleColor: 'white',
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight'
});
}