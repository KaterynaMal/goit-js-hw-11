import axios from 'axios';

// const axios = {
//   baseURL: 'https://pixabay.com/api/',
// //   apiKey: '40574531-a84246791794da3cbc69c8a1d',
//   params: {
//     key: '40574531-a84246791794da3cbc69c8a1d',
//     q: searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     },
//   return response.data.hits;
// };

async function fetchImages(searchQuery) {
  const apiKey = 'YOUR_PIXABAY_API_KEY';
  const apiUrl = 'https://pixabay.com/api/';
  const response = await axios.get(apiUrl, {
    params: {
      key: apiKey,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}

// const apiKey ='40574531-a84246791794da3cbc69c8a1d';
// axios.defaults.headers.common['x-api-key'] = apiKey;
// axios.defaults.baseURL = 'https://pixabay.com/api/';

export function FetchPixabayAPI() {
  return axios.get('images').then(res => res.data);
}
