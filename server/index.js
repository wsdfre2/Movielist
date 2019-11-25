const express = require('express')
const app = express();
const port = 3411;
const path = require('path');
const Controller = require('./controller.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening in on port ${port}!`));

app.use('/', express.static(path.join(__dirname, '../public/dist')));


app.get('/search', (req, res) => {
    Controller.getMovieData(req, res);
})

app.post('/search', (req, res) => {
    let search = req.body.search
    Controller.getMovieApi(search, res);
})

/* SEQUELIZE //MONGO */
/*
app.get('/search', (req, res) => {
    Controller.getMovieData(req, res);
})

app.post('/search', (req, res) => {
    let search = req.body.search;
    Controller.getMovieApi(search, res)
})
*/
