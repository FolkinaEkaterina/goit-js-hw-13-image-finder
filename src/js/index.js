import '../sass/main.scss';
import cardTpl from '../templates/card-image.hbs';
import API from './apiService';
import getRefs from './get-refs';
import LoadMoreBtn from './load-more-btn';
import Notiflix from 'notiflix';

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
    return Notiflix.Notify.warning('Пустая строка! Ведите значение.');
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearPicturesContainer();

  loadMoreBtn.disable();

  onLoadMore();
}

function onLoadMore() {
  apiService.fetchPictures().then(appendCardMarkup);

  loadMoreBtn.enable();
}

function appendCardMarkup(hits) {
  refs.picturesContainer.insertAdjacentHTML('beforeend', cardTpl(hits));

  if (!hits.length) {
    loadMoreBtn.hide();
    return Notiflix.Notify.warning('по вашему запросу ничего не найдено');
  }
  if (!hits.length || hits.length < 11) {
    loadMoreBtn.hide();
    scrollInto();
    return Notiflix.Notify.warning('Последние картинки по запросу');
  }
  scrollInto();
}

function clearPicturesContainer() {
  refs.picturesContainer.innerHTML = '';
}

function scrollInto() {
  refs.load.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
