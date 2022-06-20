var express = require("express");
var router = express.Router();
const mysql = require("mysql")

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

router.get("/", (req, res, next) => {
    connection.query(`SELECT * FROM total_fimls`, (err, results) => {
        if(err) throw err;
        // res.json({news: results});
        res.send(results);
    })
});

module.exports = router;