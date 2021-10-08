import '../css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

import {
  clearMarkupByClass,
  showResult
} from './functions';

const filter = name =>
  fetchCountries(`/name/${name}?fields=name,capital,population,flag,languages`)
    .then(result => {
      console.log(result);
      if (result.status === '404') throw 'Oops, there is no country with that name';
      if (result.length > 10)
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      else showResult(result);
    })
    .catch(err => {
      Notiflix.Notify.failure(err);
    });

const searchBox = document.querySelector('#search-box');
searchBox.addEventListener(
  'input',
  debounce(() => {
    clearMarkupByClass('country-list');
    clearMarkupByClass('country-info');
    if (!searchBox.value.trim() == '') {
      filter(searchBox.value.trim());
    }
  }, DEBOUNCE_DELAY),
);
