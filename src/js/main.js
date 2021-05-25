import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import countryCardTpl from '../templates/country.hbs';
import countryListTpl from '../templates/country-list.hbs';
import API from '../js/fetchCountries.js';
import getRefs from '../js/get-refs.js';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(e) {
    const searchQuery = e.target.value;

    API.fetchCountries(searchQuery).then(data => {
        if (data.status === 404) {
            error({ text: 'country not found' });
        }
        if (data.length > 10) {
            error({
                text: 'too many matches found.Please enter a more specific query!',
            });
            resetPage();
        }
        if (data.length > 2 && data.length <= 10) {
            renderCountryesList(data);
        }
        if (data.length === 1) {
            renderCountryCard(data);
        }
    });
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
}

function renderCountryesList(country) {
    const markup = countryListTpl(country);
    refs.cardContainer.innerHTML = markup;
}

function resetPage() {
    refs.cardContainer.innerHTML = '';
}
