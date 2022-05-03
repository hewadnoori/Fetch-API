const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())//takes the response from fetch, puts it into a function and parses the json data into javascript with .json()
        .catch(error => console.log('Looks like ther was a problem', error))
}
fetchData('https://dog.ceo/api/breeds/list')
    .then(data => generateOptions(data.message))


fetchData('https://dog.ceo/api/breeds/image/random')
    .then(data => generateImage(data.message))



// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function generateOptions(data) {
    const options = data.map(item => `
        <option value='${item}'>${item}</option>
    `).join('');
    select.innerHTML = options;
}

function generateImage(data) {
    const html = `
        <img src='${data}' alt>
        <p>Click to view images of ${select.value}s</p>
    `;
    card.innerHTML = html;
}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`;
        })
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

