var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var router1 = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'testdb1'
});

let id = 0;

connection.connect((err) => {
    (err) ?
    console.log(err)
    :
    console.log(connection)
})

router.post("/postData", (req, res, next) => {
    let data = req.body;
    id = data.id;
    console.log("id is", id)
    res.send(JSON.stringify({"status": 200, "error": null}))
});

router.get("/postData/actor", (req, res, next) => {
    connection.query(`SELECT * FROM actor WHERE id = "${id}"`, (err, results) => {
        if(err) throw err;
        // res.json({news: results});
        res.send(results);
    })
});

router.get("/postData/director", (req, res, next) => {
    connection.query(`SELECT * FROM director WHERE id = "${id}"`, (err, results) => {
        if(err) throw err;
        // res.json({news: results});
        res.send(results);
    })
});

router.get("/postData/category", (req, res, next) => {
    connection.query(`SELECT * FROM category WHERE id = "${id}"`, (err, results) => {
        if(err) throw err;
        // res.json({news: results});
        res.send(results);
    })
});

router.get("/postData/espisodes", (req, res, next) => {
    connection.query(`SELECT * FROM espisodes WHERE id = "${id}"`, (err, results) => {
        if(err) throw err;
        // res.json({news: results});
        res.send(results);
    })
});

module.exports = router;