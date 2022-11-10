import { Notify } from 'notiflix/build/notiflix-notify-aio';
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(resolve => {
      if (resolve.status === 404) {
        Notify.failure('Oops, there is no country with that name');
      }
      return resolve.json();
    })
    .then(name => {
      if (name.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (name.length >= 2 && name.length <= 10) {
        const countries = name
          .map(
            country =>
              `<li><img  src="${country.flags.svg}" alt="Flag of ${country.name.official}"><p>${country.name.official}</p></li>`
          )
          .join('');
        countryList.insertAdjacentHTML('beforeend', countries);
      } else if (name.length === 1) {
        countryInfo.innerHTML = `<img src="${name[0].flags.svg}" alt="Flag of ${
          name[0].name.official
        }" />
    <h3>${name[0].name.official}</h3>
    <p><span>Capital:</span> ${name[0].capital}</p>
    <p><span>Population:</span> ${name[0].population}</p>
          <p><span>Languages:</span> ${Object.values(name[0].languages).join(
            ', '
          )}</p>`;
      }
    })
    .catch(error => console.log(error));
}
