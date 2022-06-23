var express = require("express");
var router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'testdb1'
});

let user = "";
let pass = "";

connection.connect((err) => {
    (err) ?
        console.log(err)
        :
        console.log(connection)
})

router.post("/creAcc", (req, res, next) => {
    user = req.body.user;
    pass = req.body.pass;
    connection.query(`INSERT INTO user (user, pass, status) VALUE ("${user}", "${pass}", "true")`, (err, results) => {
        if (err) throw err;
        console.log("Create Successed!")
        res.send(JSON.stringify({ "status": 200, "error": null }));
    });
});

module.exports = router;