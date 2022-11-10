import './css/styles.css';

import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
input.addEventListener('input', debounce(onInputSubmit, DEBOUNCE_DELAY));

function onInputSubmit(event) {
  event.preventDefault();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  const name = event.target.value.trim();
  if (name.length !== 0) {
    fetchCountries(name);
  }
}
