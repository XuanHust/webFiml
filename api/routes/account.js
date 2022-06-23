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

router.post("/account", (req, res, next) => {
    user = req.body.user;
    pass = req.body.pass;
    // console.log("data", user)
    res.send(JSON.stringify({ "status": 200, "error": null }));
});

router.get("/account", (req, res, next) => {
    console.log("data", user)
    connection.query(`SELECT * FROM user 
    WHERE (user.user = "${user}" AND user.pass = "${pass}")
    `, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;