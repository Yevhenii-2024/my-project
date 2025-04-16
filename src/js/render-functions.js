import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const DOM_TREE = {
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    showMore: document.querySelector('[data-showMore]'),
    form: document.querySelector('.form')
}

const lightBox = new SimpleLightbox('.gallery a', {
    navText: ['←', '→'],
    captionsData: 'alt',
    captionDelay: '250'
});

export function createMarkup(array) {
    const markUp = array
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            return `
         <li class="card">
              <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" />
            <ul class="img-info">
               <li class="text"><span class="bold">Likes</span>${likes}</li>
               <li class="text"><span class="bold">Views</span>${views}</li>
               <li class="text"><span class="bold">Comments</span>${comments}</li>
               <li class="text"><span class="bold">Downloads</span>${downloads}</li>
            </ul>
            </a>
        </li>
            `;
        }).join('');
    DOM_TREE.gallery.insertAdjacentHTML('beforeend', markUp);
    lightBox.refresh();
}

export function clearGallery() {
    DOM_TREE.gallery.innerHTML = '';
} 

export function showLoader() {
    DOM_TREE.loader.style.display = 'block';
}

export function pickUpLoader() {
    DOM_TREE.loader.style.display = 'none';
}

export function showMoreButton() {
    DOM_TREE.showMore.classList.remove('visually-hidden');
}

export function pickUpShowMoreButton() {
    DOM_TREE.showMore.classList.add('visually-hidden');
}