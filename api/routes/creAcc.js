var express = require("express");
var router = express.Router();
const db = require("../models/connectDataBase");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../models/generateAccessToken");


router.post("/creAcc", async (req, res, next) => {
    let user = req.body.user;
    let pass = req.body.pass;

    encruptedPassword = await bcrypt.hash(pass, 10);

    db.query(`INSERT INTO user (user, pass, status) VALUE ("${user}", "${encruptedPassword}", "true")`, (err, results) => {
        if (err) throw err;
        console.log("Create Successed!");
        const token = generateAccessToken({ username: req.body.user });
        res.status(201).json(token);
    });

});

module.exports = router;