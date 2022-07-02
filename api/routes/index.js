var express = require('express');
var router = express.Router();
const db = require("../models/connectDataBase");

/* GET home page. */
router.get('/', function (req, res, next) {
  db.query(`SELECT * FROM user `, (err, results) => {
    if (err) throw err;
    res.render('index', { data: results });
  });
});

module.exports = router;
