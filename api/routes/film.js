var express = require('express');
var router = express.Router();
const db = require("../models/connectDataBase");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const formidable = require('formidable');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//display films page
router.get('/', function (req, res, next) {
    db.query('SELECT * FROM total_films', function (err, rows) {
        if (err) {
            //render to views/film/index.ejs
            res.render('film', { data: '' });
        } else {
            //render to views/film/index.ejs
            res.render('film', { data: rows });
        }
    });
});


//display add film page
router.get('/add', function (req, res, next) {
    //render to film.ejs
    res.render('film/add', {
        name: '',
        originName: '',
        content: '',
        type: '',
        status: '',
        thumbUrl: '',
        time: '',
        episodeCurrent: '',
        episodeTotal: '',
        quality: '',
        lang: '',
        slug: '',
        year: '',
        country: '',
        file: '',
        nameActor: '',
        nameDirector: '',
        category: '',
        nameServer: '',
        espisode: '',
    })
});

//add a new film
router.post('/add', function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let { name, originName, content, type, status, time, episodeCurrent, episodeTotal, quality, lang, slug, year, country, nameActor, nameDirector, category, nameServer, espisode, thumbUrl, file } = fields;
        let id = (Math.random() + 1).toString(36).substring(2);
        let errors = false;

        if (name.length === 0 || originName.length === 0 || content.length === 0 || type.length === 0 || status === 0 || thumbUrl === 0 || episodeCurrent === 0 || episodeTotal === 0 || quality === 0 || lang === 0 || slug == 0 || year === 0 || country === 0 || file === 0) {
            errors = true;
            res.render('film/add', {
                name: name,
                originName: originName,
                content: content,
                type: type,
                status: status,
                thumbUrl: '',
                time: time,
                episodeCurrent: episodeCurrent,
                episodeTotal: episodeTotal,
                quality: quality,
                lang: lang,
                slug: slug,
                year: year,
                country: country,
                nameActor: nameActor,
                nameDirector: nameDirector,
                category: category,
                nameServer: nameServer,
                espisode: espisode,
                file: '',
            })
        }

        if (!errors) {
            let form_data = {
                id: id,
                name: name,
                originName: originName,
                content: content,
                type: type,
                status: status,
                thumbUrl: files.thumbUrl.filepath,
                time: time,
                episodeCurrent: episodeCurrent,
                episodeTotal: episodeTotal,
                quality: quality,
                lang: lang,
                slug: slug,
                year: year,
                country: country,
                nameActor: nameActor,
                nameDirector: nameDirector,
                category: category,
                nameServer: nameServer,
                espisode: espisode,
                file: files.file.filepath,
            }

            const uploadFilm = async (video, img) => {
                const linkVideo = await cloudinary.uploader.upload(form_data.file, {
                    resource_type: "video",
                    eager: [{ streaming_profile: "full_hd", format: "m3u8" }],
                    eager_async: true,
                })
                form_data = { ...form_data, linkVideo }
                const linkThumb = await cloudinary.uploader.upload(form_data.thumbUrl);
                form_data = { ...form_data, linkThumb }

                db.query(`INSERT INTO total_films (id, name, origin_name, content, type, status, thumb_url, time, episode_current, episode_total, quality, lang, slug, year, country)
                VALUE ("${form_data.linkVideo.asset_id}",
                "${form_data.name}",
                "${form_data.originName}",
                "${form_data.content}",
                "${form_data.type}",
                "${form_data.status}",
                "${form_data.linkThumb.url}",
                "${form_data.time}",
                "${form_data.episodeCurrent}",
                "${form_data.episodeTotal}",
                "${form_data.quality}",
                "${form_data.lang}",
                "${form_data.slug}",
                "${form_data.year}",
                "${form_data.country}")`)

                db.query(`INSERT INTO actor (id, name) VALUE ("${form_data.linkVideo.asset_id}", "${form_data.nameActor}")`)

                db.query(`INSERT INTO director (id, name) VALUE ("${form_data.linkVideo.asset_id}", "${form_data.nameDirector}")`)

                db.query(`INSERT INTO category (id, name) VALUE ("${form_data.linkVideo.asset_id}", "${form_data.category}")`)

                db.query(`INSERT INTO espisodes (id, server_name, slug, link)
                VALUE ("${form_data.linkVideo.asset_id}",
                "${form_data.nameServer}",
                "${form_data.espisode}",
                "${form_data.linkVideo.url}")`)

                res.redirect('/film');
            }
            uploadFilm();
        }
    })
});


// display edit film page
router.get('/edit/(:id)', function (req, res, next) {

    let id = req.params.id;

    db.query(`SELECT * FROM total_films WHERE id = "${id}"`, function (err, rows, fields) {
        if (err) throw err

        // if user not found
        if (rows.length <= 0) {
            res.redirect('/film')
        }
        // if user found
        else {
            res.render('film/edit', {
                id: rows[0].id,
                name: rows[0].name,
                originName: rows[0].origin_name,
                content: rows[0].content,
                type: rows[0].type,
                status: rows[0].status,
                thumbUrl: rows[0].thumb_url,
                time: rows[0].time,
                episodeCurrent: rows[0].episode_current,
                episodeTotal: rows[0].episode_total,
                quality: rows[0].quality,
                lang: rows[0].lang,
                slug: rows[0].slug,
                year: rows[0].year,
                country: rows[0].country,
            })
        }
    })
})

// update book data
router.post('/update/:id', function (req, res, next) {

    let id = req.params.id;
    let name = req.body.name;
    let originName = req.body.originName;
    let content = req.body.content;
    let type = req.body.type;
    let status = req.body.status;
    let time = req.body.time;
    let episodeCurrent = req.body.episodeCurrent;
    let episodeTotal = req.body.episodeTotal;
    let quality = req.body.quality;
    let lang = req.body.lang;
    let slug = req.body.slug;
    let year = req.body.year;
    let country = req.body.country;
    let errors = false;

    if (name.length === 0 || originName.length === 0 || content.length === 0 || type.length === 0 || status === 0 || episodeCurrent === 0 || episodeTotal === 0 || quality === 0 || lang === 0 || slug == 0 || year === 0 || country === 0) {
        errors = true;
        res.render('film/edit', {
            name: name,
            originName: originName,
            content: content,
            type: type,
            status: status,
            time: time,
            episodeCurrent: episodeCurrent,
            episodeTotal: episodeTotal,
            quality: quality,
            lang: lang,
            slug: slug,
            year: year,
            country: country,
        })
    }

    // if no error
    if (!errors) {

        var form_data = {
            name: name,
            originName: originName,
            content: content,
            type: type,
            status: status,
            time: time,
            episodeCurrent: episodeCurrent,
            episodeTotal: episodeTotal,
            quality: quality,
            lang: lang,
            slug: slug,
            year: year,
            country: country,
        }
        // update query
        db.query(`UPDATE total_films SET name = "${form_data.name}",
         origin_name ="${form_data.originName}",
          content = "${form_data.content}",
           type = "${form_data.type}",
           status = "${form_data.status}",
           time = "${form_data.time}",
           episode_current = "${form_data.episodeCurrent}",
           episode_total = "${form_data.episodeTotal}",
           quality = "${form_data.quality}",
           lang = "${form_data.lang}",
           slug = "${form_data.slug}",
           year = "${form_data.year}",
           country = "${form_data.country}"
           WHERE (id = "${id}")`, function (err, result) {
            //if(err) throw err
            console.log(">>>", err)
            if (err) {
                res.render('film/edit', {
                    id: req.params.id,
                    name: req.body.name,
                     originName : req.body.originName,
                     content : req.body.content,
                     type : req.body.type,
                     status : req.body.status,
                     time : req.body.time,
                     episodeCurrent : req.body.episodeCurrent,
                     episodeTotal : req.body.episodeTotal,
                     quality : req.body.quality,
                     lang : req.body.lang,
                     slug : req.body.slug,
                     year : req.body.year,
                     country : req.body.country,
                })
            } else {
                res.redirect('/film');
            }
        })
    }
})

// delete book
router.get('/delete/(:id)', function (req, res, next) {

    let id = req.params.id;

    db.query(`DELETE FROM total_films WHERE id = "${id}"`, function (err, result) {
        //if(err) throw err
        if (err) {
            // redirect to user page
            res.redirect('/film')
        } else {
            // redirect to user page
            res.redirect('/film')
        }
    })
})

module.exports = router;
