import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderSingleCountryInfo({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return ` <div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}"> 
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>

</div>
`;
}

// new SimpleLightbox('.gallery a', {
//   // captionsData: 'alt',
//   animationSpeed: 250,
// });
// // refresh();

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {
  // do something…
});

gallery.on('error.simplelightbox', function (e) {
  console.log(e); // some usefull information
});
