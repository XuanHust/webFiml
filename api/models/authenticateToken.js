const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === "null") {
        return res.sendStatus(401);
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                next();
            }
        })
    }
}

module.exports = verifyToken;