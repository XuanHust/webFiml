var express = require("express");
var router = express.Router();
const db = require("../models/connectDataBase");
const keysToCamel = require('../models/toCamelCase');

router.post("/filterFilm", (req, res, next) => {
    let data = req.body;

    db.query(`SELECT * FROM category, total_films 
    WHERE (category.name = "${data.category}") 
    AND (total_films.type = "${data.type}") AND (total_films.country = "${data.nation}") AND (total_films.year = "${data.year}") AND (category.id = total_films.id)
    GROUP BY total_films.id`, (err, results) => {
        if (err) throw err;
        res.status(200).json(keysToCamel(results));
    })
});

module.exports = router;