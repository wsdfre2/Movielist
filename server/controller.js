const axios = require('axios');
const Model = require('./model.js');
/* MYSQL
module.exports = {
    getMovieApi: (search, callback) => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8e3d21e51df339dab9203326161f6796&language=en-US&query=${search}&page=1&include_adult=false`).
        then((data) => {
            const title = data.data.results[0].title;
            const release_date = data.data.results[0].release_date
            const poster_path = data.data.results[0].poster_path
            const newData = {
                title : title,
                release_date: release_date,
                poster_path: poster_path
            }
            
            Model.saveMovieData(newData, callback)
        })
    },

    getMovieData: (req, res) => {
        Model.getMovieData((err, data) => {
            if (err) {
                res.status(400).send();
            } else {
                res.status(200).send(data);
            }
        })
    }
}
*/
/* SEQUELIZE
module.exports = {
    getMovieApi: (search, res) => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8e3d21e51df339dab9203326161f6796&language=en-US&query=${search}&page=1&include_adult=false`)
        .then((data) => {
            const title = data.data.results[0].title;
            const release_date = data.data.results[0].release_date
            const poster_path = data.data.results[0].poster_path
            const newData = {
                title : title,
                release_date: release_date,
                poster_path: poster_path
            }
            Model.saveNewMovie(newData, (err) => {
                if (err) {
                    res.status(400).send();
                } else {
                    res.status(201).send();
                }
            })
        })
    },
    getMovieData: (req, res) => {
        Model.queryDatabase((err, data) => {
            if (err) {
                console.log('there was an err :', err)
                res.status(400).send();
            } else {
                res.status(200).send(data);
            }
        })
    }
}
*/
module.exports= {
    getMovieApi: (search, res) => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8e3d21e51df339dab9203326161f6796&language=en-US&query=${search}&page=1&include_adult=false`)
        .then((data) => {
            const title = data.data.results[0].title;
            const release_date = data.data.results[0].release_date
            const poster_path = data.data.results[0].poster_path
            const newData = {
                title : title,
                release_date: release_date,
                poster_path: poster_path
            }
            Model.saveToDatabase(newData, (err) => {
                if (err) {
                    res.status(400).send();
                } else {
                    res.status(201).send();
                }
            })
        })
    },
    getMovieData: (req, res) => {
        Model.queryDatabase((err, data) => {
            if (err) {
                res.status(400).send();
            } else {
                console.log('this is data :', data);
                res.status(200).send(data)
            }
        })
    }
}