var express = require("express");
var router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'testdb1'
});

let types = "";
let slugs = "";

connection.connect((err) => {
    (err) ?
        console.log(err)
        :
        console.log(connection)
})

router.post("/selectType", (req, res, next) => {
    let data = req.body;
    types = data.type;
    slugs = data.slug;
    res.send(JSON.stringify({ "status": 200, "error": null }));
});

router.get("/selectType/:slugs", (req, res, next) => {
    // console.log('req.params :>> ', req.params);
    connection.query(`SELECT * FROM category, total_fimls 
    WHERE (category.name = "${types}" AND total_fimls.id = category.id) OR (total_fimls.country = "${types}")
    GROUP BY total_fimls.id`, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;