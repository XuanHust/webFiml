var express = require("express");
var router = express.Router();
const db = require("../models/connectDataBase");
const keysToCamel = require('../models/toCamelCase');

let name = "";

router.post("/searchActor", (req, res, next) => {
    let data = req.body;
    data.actor ?
        name = data.actor
        :
        name = "abc"
    res.send(JSON.stringify({ "status": 200, "error": null }))
});

router.get("/searchActor/films", (req, res, next) => {
    db.query(`SELECT * FROM actor, total_films 
    WHERE ((actor.name = "${name}") AND (total_films.id = actor.id)) OR (total_films.name = "${name}")
    GROUP BY total_films.id`, (err, results) => {
        if (err) throw err;
        res.send(keysToCamel(results));
    })
});

module.exports = router;