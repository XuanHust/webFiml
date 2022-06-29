var express = require("express");
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

router.post("/postComment", (req, res, next) => {
    connection.query(`INSERT INTO comment (user, idFilm, content, id) VALUE ("${req.body.user}", "${req.body.id}", "${req.body.comment}",  "${req.body.key}")`, (err, results) => {
        if (err) throw err;
        console.log("Post Comment Successed!")
        res.send(JSON.stringify({ "status": 200, "error": null }));
    });
});

module.exports = router;