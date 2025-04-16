import * as render from './js/render-functions';
import { getRequest, messageError } from './js/pixabay-api';
import { DOM_TREE } from './js/render-functions';


DOM_TREE.form.addEventListener('submit', handlerSubmit);
DOM_TREE.showMore.addEventListener('click', showMoreHandler);

let page = 1;
let searchData = '';
const PER_PAGE = 15;

function handlerSubmit(event) {
    event.preventDefault();
    searchData = this.elements['search-text'].value.trim();
    resetInput();
    if (!searchData) {
        messageError('Enter correct data, please');
        return;
    }
    requestGallery();
}

async function requestGallery() {
    render.showLoader();
    try {
        const response = await getRequest(searchData, page);
        checkData(response.totalHits);
        render.createMarkup(response.hits);
        checkMore(response);
    } catch (error) {
        if (error.message === 'no item') {
            return;
        }
        messageError(error.message);
    } finally {
        render.pickUpLoader();
    }
    
}

async function showMoreHandler() {
    render.pickUpShowMoreButton();
    render.showLoader();
    page++;
    DOM_TREE.showMore.disabled = true;
    try {
        const response = await getRequest(searchData, page);
        render.createMarkup(response.hits);
        DOM_TREE.showMore.disabled = false;
        checkMore(response);
        scrollPage();
    } catch (error) {
        messageError(error.message);
    } finally { 
        render.pickUpLoader();
    }
}

function resetInput() {
  render.pickUpShowMoreButton();
  render.clearGallery();
  page = 1;
  DOM_TREE.form.reset();
}

function checkData(data) {
  if (!data) {
    messageError('Sorry, there are no images matching your search query. Please try again!');
    render.pickUpLoader();
    throw new Error('no item');
  }
}

function checkMore(response) {
  if (Math.ceil(response.totalHits / PER_PAGE) === page) {
    showError("We're sorry, but you've reached the end of search results.", '0e9c79');
    return;
  }
  render.showMoreButton();
}

function scrollPage() {
  const height = DOM_TREE.gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}