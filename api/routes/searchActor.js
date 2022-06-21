var express = require("express");
var router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'testdb1'
});

let name = "";

connection.connect((err) => {
    (err) ?
    console.log(err)
    :
    console.log(connection)
})

router.post("/searchActor", (req, res, next) => {
    let data = req.body;
    data.actor ?
    name = data.actor
    :
    name = "abc"
    console.log("id is", name);
    res.send(JSON.stringify({"status": 200, "error": null}))
});

router.get("/searchActor/fimls", (req, res, next) => {
    connection.query(`SELECT * FROM actor, total_fimls 
    WHERE ((actor.name = "${name}") AND (total_fimls.id = actor.id)) OR (total_fimls.name = "${name}")
    GROUP BY total_fimls.id`, (err, results) => {
        if(err) throw err;
        res.send(results);
    })
});

module.exports = router;