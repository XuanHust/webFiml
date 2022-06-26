var express = require('express');

var router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'testdb1'
});


connection.connect((err) => {
  (err) ?
    console.log(err)
    :
    console.log(connection)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  connection.query(`SELECT * FROM user `, (err, results) => {
    if (err) throw err;
    // res.send(results);
    res.render('index', { data: results });
  });
  // res.render('index', {data:"xuan"})
});

module.exports = router;
