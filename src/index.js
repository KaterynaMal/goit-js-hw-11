import axios from "axios";
import { FetchPixabayAPI } from "./pixabayAPI";

const refs = {
    searchForm: document.querySelector('#search-form'),
    searchQueryInput: document.querySelector('[name="searchQuery"]'),
    submitBtn: document.querySelector('[type="submit"]'),
    gallery: document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', onGettingImage);

async function onGettingImage(e) {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();
}

FetchPixabayAPI()
  .then(images => {
    Pixabay(images);
  })

  .catch(() => {
    // showError();
  })
  .finally(() => {
    // hideLoader();
  });

function Pixabay(images) {
    const galleryHTML = 
    images.map(image => {
        const card = document.createElement('div');
        card.classList.add('.photo-card');

        const img = document.createElement('img');
        img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';

    })
}

function renderGallery(photo) {
    const marKup = photo;
    refs.gallery.innerHTML = `
    <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>
    `;
        
}

// async function PixabayImg(images) {
//     const options = [];
//     const response = await axios.get(baseURL, {
//       params: {
//       key: apiKey,
//       q: searchQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//     },
//     }) 
//     return response.data.hits;
//  }