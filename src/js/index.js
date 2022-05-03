import axios from 'axios';
import Notiflix from 'notiflix';
import getPicture from '../js/helpers/axiosGetGallery';

import '../sass/main.scss';

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchFormInput: document.querySelector('.search-form input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', valueSearch);

async function valueSearch(e) {
  e.preventDefault();

  try {
    const query = refs.searchFormInput.value;
    const items = await getPicture(query);
    // console.log('items', items);
    clearGalleryContainer();

    if (items.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
  } catch (error) {
    console.log('Error');
  }
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
