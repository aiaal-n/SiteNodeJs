var express = require('express');
var router = express.Router();
const Request = require('../models/request');
const City = require('../models/city');

/* GET home page. */
router.get('/', function(req, res, next) {
    Request.find({}).then(requests => {
        res.render('request/index',{requests: requests});
    })
});

router.post('/create', function(req, res, next) {
    const {name, city} = req.body;
    Request.create({
        name: name,
        city_id: city
    }).then(
        post => res.redirect('/clinic/view?id='+post.id)
    ).catch(error =>
        City.find({}).then(cities => {
            res.render('clinic/create',{cities: cities, failureFlash: 'Не правильно ввели данные. Повторите попытку'});
        })
    );
});

router.get('/create', function(req, res, next) {
    City.find({}).then(cities => {
        res.render('clinic/create',{cities: cities});
    });
});

router.get('/view', function(req, res, next) {
    Request.find({'_id':req.query.id}).populate('city_id').then(clinic => {
        res.render('clinic/view',{clinic: clinic});
    });
});

module.exports = router;