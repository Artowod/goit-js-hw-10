import '../css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const showResult = function (result) {
  if (result.length == 1) {
    const { flag, name, capital, population, languages } = result[0];
    let langString = '';
    const langList = languages.map(({ name }) => {
      langString += name + ', ';
    });
    langString = langString.slice(0, langString.length - 2);
    let resultString = `
      <img src  = "${flag}" alt = "${name}" width ="50px"><span class="country-title">${name}</span>
      <ul class= "country-info__params">
        <li>
          <span class="country-info__param-title">Capital:</span>
          <span class="country-info__param-value">${capital}</span>
        </li>
        <li>
          <span class="country-info__param-title">Population:</span>
          <span class="country-info__param-value">${population}</span>
        </li>
        <li>
          <span class="country-info__param-title">Languages:</span>
          <span class="country-info__param-value">${langString}</span>
        </li>
      </ul>
      `;
    document.querySelector('.country-info').innerHTML = resultString;
  } else {
    let resultString = '';
    result.map(({ flag, name }) => {
      resultString += `
      <li class = "country-parameter">
      <img src  = "${flag}" alt = "${name}" width ="50px">
      <spam class = "country-name">${name}</span>
      </li>
      `;
    });
    document.querySelector('.country-list').innerHTML = resultString;
  }
};

const filter = name =>
  fetchCountries(`/name/${name}?fields=name,capital,population,flag,languages`)
    .then(result => {
      if (result.status) throw 'Oops, there is no country with that name';
      if (result.length > 10)
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      else showResult(result);
    })
    .catch(err => {
      Notiflix.Notify.failure(err);
    });

const clearMarkupByClass = function (className) {
  document.querySelector(`.${className}`).innerHTML = '';
};

const typeElement = document.querySelector('#search-box');
typeElement.addEventListener(
  'input',
  debounce(() => {
    clearMarkupByClass('country-list');
    clearMarkupByClass('country-info');
    if (!typeElement.value == '') {
      document.querySelector('#search-box');
      filter(typeElement.value.trim());
    }
  }, DEBOUNCE_DELAY),
);
