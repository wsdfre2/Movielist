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