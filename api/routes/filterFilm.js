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

let datafilter = {};

connection.connect((err) => {
    (err) ?
        console.log(err)
        :
        console.log(connection)
})

router.post("/filterFilm", (req, res, next) => {
    let data = req.body;
    datafilter = data
    // console.log("id is", datafilter)
    res.send(JSON.stringify({ "status": 200, "error": null }))
});

router.get("/filterFilm/films", (req, res, next) => {
    connection.query(`SELECT * FROM category, total_films 
    WHERE (category.name = "${datafilter.category}") 
    AND (total_films.type = "${datafilter.type}") AND (total_films.country = "${datafilter.nation}") AND (total_films.year = "${datafilter.year}") AND (category.id = total_films.id)
    GROUP BY total_films.id`, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

module.exports = router;