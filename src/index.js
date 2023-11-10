import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '40574531-a84246791794da3cbc69c8a1d';
const API_URL = 'https://pixabay.com/api/';
const perPage = 20;

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a');

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', onGettingImages);

async function onGettingImages(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;

  try {
    const images = await fetchImages(currentQuery, currentPage);
    renderGallery(images.hits);

    if (images.hits.length === 0) {
      Notiflix.Notify.warning('Sorry, no images found.');
    } else {
      showLoadMoreBtn(images.totalHits);
      Notiflix.Notify.info(`Hooray! We found ${images.totalHits} images.`);
      lightbox.refresh();
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong. Please try again.');
  }
}

loadMoreBtn.addEventListener('click', onLoadMore);
async function onLoadMore() {
  try {
    currentPage += 1;
    const images = await fetchImages(currentQuery, currentPage);
    renderGallery(images.hits);

    if (images.hits.length === 0) {
      hideLoadMoreBtn();
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.3,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error fetching more images:', error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong while fetching more images.'
    );
  }
}

async function fetchImages(query, page) {
  const response = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    },
  });

  return response.data;
}

function renderGallery(images) {
  if (currentPage === 1) {
    gallery.innerHTML = '';
  }

  const galleryHTML = images.map(image => {
    const card = document.createElement('div');
    card.classList.add('photo-card');

    const link = document.createElement('a');
    link.href = image.largeImageURL;
    link.setAttribute('data-lightbox', 'gallery');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.classList.add('info');

    const infoItems = ['Likes', 'Views', 'Comments', 'Downloads'];
    const infoHTML = infoItems
      .map(
        item =>
          `<p class="info-item"><b>${item}</b>: ${
            image[item.toLowerCase()] || 0
          }</p>`
      )
      .join('');
    info.innerHTML = infoHTML;

    link.appendChild(img);
    card.appendChild(link);
    card.appendChild(info);

    return card;
  });

  gallery.append(...galleryHTML);
}

function showLoadMoreBtn(totalHits) {
  if (currentPage * perPage < totalHits) {
    loadMoreBtn.style.display = 'block';
  } else {
    hideLoadMoreBtn();
  }
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}
