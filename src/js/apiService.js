const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '10919833-bca9a9d79073941b794319666';

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.image_type = 'photo';
    this.orientation = 'horizontal';
    this.page = 1;
    this.per_page = 12;
  }

  async fetchPictures() {
    try {
      const url = `${BASE_URL}/?image_type=${this.image_type}&orientation=${this.orientation}&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      this.incrementPage();
      return data.hits;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
