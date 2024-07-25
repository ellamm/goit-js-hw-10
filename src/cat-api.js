import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_nGPdRguqtiSJXbOsLdIEY9kLfUyOacrWDwvhWRVam7rKyUaSvq2k1SC5BCp3Fs0l';

const API_URL = 'https://api.thecatapi.com/v1';

export const fetchBreeds = async () => {
  const response = await axios.get(`${API_URL}/breeds`);
  return response.data;
};

export const fetchCatByBreed = async breedId => {
  const response = await axios.get(`${API_URL}/images/search`, {
    params: { breed_ids: breedId },
  });
  return response.data[0];
};