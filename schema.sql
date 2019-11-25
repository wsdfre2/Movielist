DROP DATABASE IF EXISTS movielist;

CREATE DATABASE movielist;

USE movielist;

CREATE TABLE movies (
    id INT AUTO_INCREMENT,
    title varchar(255),
    release_date varchar(255),
    poster_path varchar(255),
    watched TINYINT(1) DEFAULT 0,
    PRIMARY KEY(id)
);