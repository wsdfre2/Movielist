const express = require('express')
const app = express();
const port = 3456;
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
    Controller.getMovieApi(search, (err) => {
        if (err) {
            console.log('caught an error in post');
            res.status(400).send();
        }
        res.status(201).send();
    })
})