import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function getRequest(searchData, page) {
    const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '49667356-c9b78f361687dff4f3855c0b0',
      q: searchData,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15
    }
  });
  return response.data;
}

export function messageError(message) {
    iziToast.show({
        title: `${message}`,
        titleColor: 'white',
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight'
});
}