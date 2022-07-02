var express = require("express");
var router = express.Router();
const db = require("../models/connectDataBase");
const keysToCamel = require('../models/toCamelCase');

let id = 0;

router.post("/postData", (req, res, next) => {
    let data = req.body;
    id = data.id;
    res.send(JSON.stringify({"status": 200, "error": null}))
});

router.get("/postData/actor", (req, res, next) => {
    db.query(`SELECT * FROM actor WHERE id = "${id}"`, (err, results) => {
        if(err) throw err;
        res.send(keysToCamel(results));
    })
});

router.get("/postData/director", (req, res, next) => {
    db.query(`SELECT * FROM director WHERE id = "${id}"`, (err, results) => {
        if(err) throw err;
        res.send(keysToCamel(results));
    })
});

router.get("/postData/category", (req, res, next) => {
    db.query(`SELECT * FROM category WHERE id = "${id}"`, (err, results) => {
        if(err) throw err;
        res.send(keysToCamel(results));
    })
});

router.get("/postData/espisodes", (req, res, next) => {
    db.query(`SELECT * FROM espisodes WHERE id = "${id}"`, (err, results) => {
        if(err) throw err;
        res.send(keysToCamel(results));
    })
});

module.exports = router;