var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const keysToCamel = require('../models/toCamelCase');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'testdb1'
});

let types = "";
let slugs = "";

connection.connect((err) => {
    (err) ?
        console.log(err)
        :
        console.log(connection)
})

router.get("/comment", (req, res, next) => {
    connection.query(`SELECT * FROM comment`, (err, results) => {
        if (err) throw err;
        res.send(keysToCamel(results));
    });
});

module.exports = router;