import { getRequest, massageError } from './js/pixabay-api';
import { changeLoader, renderGallery } from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
    event.preventDefault();
    const searchData = this.elements['search-text'].value.trim();
    if (!searchData) {
        form.reset();
        massageError('Enter correct data, please');
        return;
    }       
    
    renderGallery();
    changeLoader('block');
    getRequest(searchData);
}