var express = require("express");
var router = express.Router();
const keysToCamel = require('../models/toCamelCase');
const db = require('../models/connectDataBase');
const bcrypt = require("bcrypt");
const generateAccessToken = require("../models/generateAccessToken");

const validate = (req, res, result) => {
    if (result[0]?.user && (bcrypt.compare(req.body.pass, result[0].pass))) {
        const token = generateAccessToken({ username: req.body.user });
        const data = {
            err: false,
            user: req.body.user,
            token: token
        }
        res.status(200).json(data);
    } else {
        res.status(200).send({ err: true, msg: "Invalid Credentials !" });
    }
}

router.post("/account", async (req, res, next) => {
    let user = req.body.user;
    let pass = req.body.pass;

    if (!(user && pass)) {
        res.status(200).send({ err: true, msg: "All input is required !" });
    } else {
        db.query(`SELECT * FROM user 
        WHERE (user.user = "${user}")`, (err, results) => {
            if (err) throw err;
            validate(req, res, results);
        });
    }
});

module.exports = router;