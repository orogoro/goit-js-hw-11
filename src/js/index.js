import Notiflix from 'notiflix';
import NewsApiService from '../js/helpers/axiosGetGallery';
import { renderSingleCountryInfo } from '../js/gallery/galleryUI';
import LoadMoreBtn from '../js/components/load-more-btn';

import '../sass/main.scss';

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchFormInput: document.querySelector('.search-form input'),
  gallery: document.querySelector('.gallery'),
};

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearchValue);
loadMoreBtn.refs.button.addEventListener('click', onSearchMore);

async function onSearchValue(e) {
  e.preventDefault();

  newsApiService.query = refs.searchFormInput.value;

  if (newsApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return infoNotify();
  }

  newsApiService.resetPage();
  clearGalleryContainer();
  onSearchMore();
  loadMoreBtn.hide();
}

async function onSearchMore() {
  try {
    const items = await newsApiService.getPicture();

    const limitPage = items.data.totalHits / newsApiService.limit;

    if (newsApiService.page > limitPage && limitPage >= 1) {
      return infoNotify();
    } else if (newsApiService.page === 2 && newsApiService.page > limitPage) {
      return infoNotify();
    }

    showGalletyItems(items.data.hits);
    newsApiService.incrementPage();

    if (items.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      loadMoreBtn.hide();
      return;
    }
  } catch (error) {
    console.log('Error');
  }

  loadMoreBtn.show();
}

function showGalletyItems(items) {
  const cards = items.map(item => renderSingleCountryInfo(item)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', cards);
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

function infoNotify() {
  loadMoreBtn.hide();
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}
