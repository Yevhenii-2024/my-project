import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup(array) {
    const markUp = array
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            return `
         <li class="card">
              <a href="${largeImageURL}"></a>
                <img src="${webformatURL}" alt="${tags}" />
            <ul class="img-info">
               <li class="text">Likes</li>${likes}
               <li class="text">Views</li>${views}
               <li class="text">Comments</li>${comments}
               <li class="text">Downloads</li>${downloads}
            </ul>
        </li>
            `
        }).join("");
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