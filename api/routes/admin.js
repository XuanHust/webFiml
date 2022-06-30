var express = require('express');
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

//display users page
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM user', function (err, rows) {
        if (err) {
            //render to views/admin/index.ejs
            res.render('admin', { data: '' });
        } else {
            //render to views/admin/index.ejs
            res.render('admin', { data: rows });
        }
    });
});


//display add user page
router.get('/add', function (req, res, next) {
    //render to add.ejs
    res.render('admin/add', {
        user: '',
        pass: '',
    })
});

//add a new user
router.post('/add', function (req, res, next) {

    let user = req.body.user;
    let pass = req.body.pass;
    let errors = false;

    if (user.length === 0 || pass.length === 0) {
        errors = true;
        //render to add.ejs with flash message
        res.render('admin/add', {
            user: user,
            pass: pass
        })
    }

    //if no error
    if (!errors) {
        var form_data = {
            user: user,
            pass: pass,
        }

        //insert query
        connection.query(`INSERT INTO user (user, pass, status) VALUE ("${form_data.user}", "${form_data.pass}", "true")`, function (err, result) {
            //if(err) throw err
            if (err) {
                //render to add.ejs
                res.render('admin/add', {
                    user: form_data.user,
                    pass: form_data.pass,
                })
            } else {
                res.redirect('/admin');
            }
        });
    }
});


// display edit user page
router.get('/edit/(:user)', function (req, res, next) {

    let user = req.params.user;

    connection.query(`SELECT * FROM user WHERE user = "${user}"`, function (err, rows, fields) {
        if (err) throw err

        // if user not found
        if (rows.length <= 0) {
            res.redirect('/admin')
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('admin/edit', {
                title: 'Edit User',
                // id: rows[0].id,
                user: rows[0].user,
                pass: rows[0].pass
            })
        }
    })
})

// update book data
router.post('/update/:user', function(req, res, next) {

    let user = req.params.user;
    let pass = req.body.pass;
    let errors = false;

    if(user.length === 0 || pass.length === 0) {
        errors = true;
        res.render('admin/edit', {
            user: req.params.user,
            pass: pass
        })
    }

    // if no error
    if( !errors ) {

        var form_data = {
            user: req.params.user,
            pass: pass
        }
        // update query
        connection.query(`UPDATE user SET user = "${user}", pass ="${form_data.pass}", status = "true" WHERE (user = "${user}")`, function(err, result) {
            //if(err) throw err
            console.log(">>>",err)
            if (err) {
                res.render('admin/edit', {
                    // id: req.params.id,
                    user: req.params.user,
                    pass: form_data.pass
                })
            } else {
                res.redirect('/admin');
            }
        })
    }
})

// delete book
router.get('/delete/(:user)', function(req, res, next) {

    let user = req.params.user;

    connection.query(`DELETE FROM user WHERE user = "${user}"`, function(err, result) {
        //if(err) throw err
        if (err) {
            // redirect to user page
            res.redirect('/admin')
        } else {
            // redirect to user page
            res.redirect('/admin')
        }
    })
})

module.exports = router;
