import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.style.display = 'block';
  errorText.style.display = 'none';
  catInfo.innerHTML = '';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const showError = () => {
  errorText.style.display = 'block';
};

const populateBreeds = async () => {
  showLoader();
  try {
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    new SlimSelect({ select: breedSelect });
    hideLoader();
  } catch (error) {
    console.error('Error fetching breeds:', error);
    hideLoader();
    showError();
    Notiflix.Notify.failure('Failed to fetch breeds. Please try again.');
  }
};

const displayCatInfo = async breedId => {
  showLoader();
  try {
    const cat = await fetchCatByBreed(breedId);
    const breed = cat.breeds[0];
    catInfo.innerHTML = `
      <h2>${breed.name}</h2>
      <p>${breed.description}</p>
      <p><strong>Temperament:</strong> ${breed.temperament}</p>
      <img src="${cat.url}" alt="${breed.name}" />
    `;
    hideLoader();
  } catch (error) {
    console.error('Error fetching cat info:', error);
    hideLoader();
    showError();
    Notiflix.Notify.failure('Failed to fetch cat info. Please try again.');
  }
};

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  displayCatInfo(selectedBreedId);
});

populateBreeds();