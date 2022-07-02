var express = require("express");
var router = express.Router();
const db = require("../models/connectDataBase");
const keysToCamel = require('../models/toCamelCase');

router.get("/", (req, res, next) => {
    db.query(`SELECT * FROM total_films WHERE type = "shows"`, (err, results) => {
        if (err) throw err;
        res.send(keysToCamel(results));
    })
});

module.exports = router;