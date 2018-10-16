var express = require('express');
var router = express.Router();
const Clinic = require('../models/clinic');
const City = require('../models/city');

/* GET home page. */
router.get('/', function(req, res, next) {
    Clinic.find({}).then(clinics => {
        res.render('clinic/index',{clinics: clinics});
    })
});

router.post('/create', function(req, res, next) {
    const {name, city} = req.body;
    console.log(city)
    Clinic.create({
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

module.exports = router;