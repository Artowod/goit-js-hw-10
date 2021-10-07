export const clearMarkupByClass = function (className) {
  document.querySelector(`.${className}`).innerHTML = '';
};

const createMarkupForSingleResult = function (result) {
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
  return resultString;
};

const createMarkupForMultiResult = function (result) {
  let resultString = '';
  result.map(({ flag, name }) => {
    resultString += `
      <li class = "country-parameter">
      <img src  = "${flag}" alt = "${name}" width ="50px">
      <spam class = "country-name">${name}</span>
      </li>
      `;
  });
  return resultString;
};

export const showResult = function (result) {
  if (result.length == 1) {
    document.querySelector('.country-info').innerHTML = createMarkupForSingleResult(result);
  } else {
    document.querySelector('.country-list').innerHTML = createMarkupForMultiResult(result);
  }
};
