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
Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
    .then(data => {
        const breedList = data[0].message;
        const randomImage = data[1].message;

        generateOptions(breedList);
        generateImage(randomImage);
    })
//another way
//     // store urls to fetch in an array
// const urls = [
//     'https://dog.ceo/api/breeds/list',
//     'https://dog.ceo/api/breeds/image/random'
//   ];

//   // use map() to perform a fetch and handle the response for each url
//   Promise.all(urls.map(url =>
//     fetch(url)
//       .then(checkStatus)                 
//       .then(parseJSON)
//       .catch(logError)
//   ))
//   .then(data => {
//     // do something with the data
//   })

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
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const config = {
        method: "POST",//indicates the type of request
        headers: {
            'Content-Type': 'application/json' //headers usually contained within an object, 'Content-Type': 'application/json' communicates to the server that the data has been encoded with JSON.
        },
        body: JSON.stringify({ name: name, comment: comment }) //this is where the values are sent to the server, the form data is transformed into a JSON string
    }

    fetch('https://jsonplaceholder.typicode.com/comments', config)//fake online rest API for testing and prototyping
        .then(checkStatus)
        .then(res => res.json())
        .then(data => console.log(data));
}