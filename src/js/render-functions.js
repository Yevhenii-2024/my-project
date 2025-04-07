import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup(array) {
    const markUp = array
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            return `
         <li class="card">
              <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" />
            </a>
            <ul class="img-info">
               <li class="text"><span class="bold">Likes</span>${likes}</li>
               <li class="text"><span class="bold">Views</span>${views}</li>
               <li class="text"><span class="bold">Comments</span>${comments}</li>
               <li class="text"><span class="bold">Downloads</span>${downloads}</li>
            </ul>
        </li>
            `;
        }).join('');
    renderGallery(markUp);
};

export function renderGallery(string = '') {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = string;
    if (string) {
        setLightBox();
    }
}

function setLightBox() {
    const lightBox = new SimpleLightbox('.gallery a', {
  navText: ['←','→'],
  captionsData: 'alt',
  captionDelay: '250',
    });
    lightBox.refresh();
}

export function changeLoader(style) {
  const loader = document.querySelector('.loader');
  loader.style.display = style;
}