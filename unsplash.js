require('es6-promise').polyfill();
require('isomorphic-fetch');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const api = require('./apiKey.js')

const unsplash = new Unsplash({
  applicationId: api.unsplash.applicationId,
  secret: api.unsplash.secret
})

unsplash.search.photos("female", 1)
  .then(toJson)
  .then(json => {
    console.log(json.results[6])
  });

// fetch(`https://api.unsplash.com/users/alklg/photos?client_id=${api.unsplash.applicationId}`, {
//     method: 'get',
//     headers: {'Content-Type':'application/json'},
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data)
// })