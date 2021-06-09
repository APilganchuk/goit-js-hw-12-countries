export default { fetchCountries };

const BASE_URL = `https://restcountries.eu/rest/v2/name/`;

async function fetchCountries(searchQuery) {
    // return fetch(`${BASE_URL}${searchQuery}`).then(response => {
    //     return response.json();
    // });
    if (searchQuery === '') {
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}${searchQuery}`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
