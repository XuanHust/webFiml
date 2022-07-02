const { response } = require("express");
var express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (userName) => {
    return jwt.sign( userName , process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s", });
}

module.exports = generateAccessToken;