var express = require("express");
var router = express.Router();
const db = require("../models/connectDataBase");
const keysToCamel = require('../models/toCamelCase');

let types = "";
let slugs = "";

router.post("/selectType", (req, res, next) => {
    let data = req.body;
    types = data.type;
    slugs = data.slug;
    res.send(JSON.stringify({ "status": 200, "error": null }));
});

router.get("/selectType/:slugs", (req, res, next) => {
    db.query(`SELECT * FROM category, total_films 
    WHERE (category.name = "${types}" AND total_films.id = category.id) OR (total_films.country = "${types}")
    GROUP BY total_films.id`, (err, results) => {
        if (err) throw err;
        res.send(keysToCamel(results));
    });
});

module.exports = router;