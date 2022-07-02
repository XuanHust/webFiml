var express = require("express");
var router = express.Router();
const db = require("../models/connectDataBase");
const verifyToken = require("../models/authenticateToken");

router.post("/postComment", verifyToken, (req, res, next) => {
    db.query(`INSERT INTO comment (user, id_film, content, id) VALUE ("${req.body.user}", "${req.body.id}", "${req.body.comment}",  "${req.body.key}")`, (err, results) => {
        if (err) throw err;
        console.log("Post Comment Successed!")
        res.send(JSON.stringify({ "status": 200, "error": null }));
    });
});

module.exports = router;