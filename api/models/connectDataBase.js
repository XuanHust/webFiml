const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'testdb1'
});

db.connect((err) => {
    (err) ?
        console.log(err)
        :
        console.log(db)
})

module.exports = db;