/* CODE USING MYSQL
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'young',
  database: 'movielist'
});
connection.connect();


module.exports = {
    saveMovieData: (data, cb) => {
        console.log('data :', data);
        let queryStr = "insert into movies (title, release_date, poster_path) values(?, ?, ?)"
        connection.query(queryStr, [data.title, data.release_date, data.poster_path], (err) => {
            if (err) {
                cb(err)
            }
            cb(null)
        })
    },
    getMovieData: (callback) => {
        let queryStr = `select * from movies`
        connection.query(queryStr, (err, data) => {
            if (err) {
                callback(err, null);
            }
            console.log('fetching db');
            callback(null, data);
        });
    }
}
*/

/* SEQUELIZE CODE
const Sequelize = require('sequelize');
const sequelize = new Sequelize('testta', 'root', 'young', {
    host: 'localhost',
    dialect: 'mysql'
})

const Movie = sequelize.define('Movie', {
    title: Sequelize.STRING,
    release_date: Sequelize.STRING,
    poster_path: Sequelize.STRING,
    watched: Sequelize.INTEGER
})

Movie.sync();

module.exports = {
    saveNewMovie: (data, callback) => {
        console.log('this is input data :', data);
        console.log(data.title)
        Movie.create({
            title: data.title,
            release_date: data.release_date,
            poster_path: data.poster_path,
            watched: '0'
        })
        .then(()=> {
            console.log('inserted to db');
            callback(null)
        })
        .catch(()=>callback('err'))
    },
    queryDatabase: (callback) => {
        Movie.findAll()
        .then((data) => {
            console.log('this is data :', data)
            callback(null, data)
        })
        .catch(() => callback('there was an err', null))
    }
}
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movielist')
const db = mongoose.connection;

const movieSchema = new mongoose.Schema({
    title: { type:String, unique:true },
    release_date: { type:String, unique:false },
    poster_path: { type:String, unique:false },
    watched: { type:Number, unique:false }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports= {
    saveToDatabase: (data, callback) => {
        data.watched = '0'
        const newMovie = new Movie(data)
        newMovie.save()
        .then(()=> callback(null))
        .catch(()=> callback('there was an err'))
    },
    queryDatabase: (callback) => {
        Movie.find()
        .then((data)=> callback(null, data))
        .catch(()=> callback('err', null))
    }
}