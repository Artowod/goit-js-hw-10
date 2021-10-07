const fetchCountries = (name = '/') =>
  new Promise((res, rej) => {
    fetch('https://restcountries.com/v2' + name)
      .then(response => {
        if (response.status >= 200 && response.status < 300) return response.json();
        rej('Server Request error.');
      })
      .then(data => res(data));
  });

export { fetchCountries };
