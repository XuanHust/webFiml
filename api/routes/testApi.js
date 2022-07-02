var express = require("express");
var router = express.Router();
const db = require("../models/connectDataBase");

router.get("/", (req, res, next) => {
    res.send("API is working properlt");
});

module.exports = router;