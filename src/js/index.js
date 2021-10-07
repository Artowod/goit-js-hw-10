import '../css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

let id = null;
/* const f =  debounce(() => {
  id = setInterval(() => {
    console.log('a');
  }, 500);
}, 2000);
console.log('start');
 f(); */

//restcountries.com/v2/{service}?fields={field},{field},{field}
//restcountries.com/v2/all?fields=name,capital,currencies
const showResult  = function (result) {
  if (result.length == 1) {
    
  } else {
    let resultList = '';
    console.log(result);
    result.map(({ flag, name }) => {
      console.log(flag, name);
      resultList+=`
      <li>
      <img src  = "${flag}" alt = "${name}" width ="50px">
      </li>
      `; 
 
    });
    document.querySelector('.country-list').innerHTML = resultList;
  }
}

//0: {languages: Array(2), flag: 'https://flagcdn.com/as.svg', name: 'American Samoa', capital: 'Pago Pago', population: 55197}

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

const typeElement = document.querySelector('#search-box');
typeElement.addEventListener(
  'input',
  debounce(() => {
    if (!typeElement.value == '') filter(typeElement.value.trim());
  }, 300),
);
