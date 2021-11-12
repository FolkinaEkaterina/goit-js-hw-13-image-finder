import '../sass/main.scss';
import cardTpl from '../templates/card-image.hbs';
import API from './apiService';
import getRefs from './get-refs';
import LoadMoreBtn from './load-more-btn';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiService = new API();
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value.trim();

  if (!apiService.query) {
    clearPicturesContainer();
    loadMoreBtn.hide();
    return alert('Пустая строка! Ведите значение.');
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearPicturesContainer();
  onLoadMore();
}

function onLoadMore() {
  loadMoreBtn.disable();
  apiService.fetchPictures().then(hits => {
    appendCardMarkup(hits);
    loadMoreBtn.enable();
    scrollIntoView();
  });
}

function scrollIntoView() {
  const gallery = document.querySelectorAll('.gallery-card');

  if (gallery.length > apiService.per_page) {
    gallery[gallery.length - apiService.per_page].scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
}

function appendCardMarkup(hits) {
  refs.picturesContainer.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function clearPicturesContainer() {
  refs.picturesContainer.innerHTML = '';
}
