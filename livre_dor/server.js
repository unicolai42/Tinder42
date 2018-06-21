let app = require('express')();

app.get('/', (request, response) => {
    response.send('Salut');
});

app.listen(8080);