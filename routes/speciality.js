var express = require('express');
var router = express.Router();
const Speciality = require('../models/speciality');
const Clinic = require('../models/clinic');

/* GET home page. */
router.get('/', function(req, res, next) {
    Speciality.find({}).then(specialites => {
        res.render('speciality/index',{specialites: specialites});
    })
});

router.post('/create', function(req, res, next) {
    const {name, city} = req.body;
    console.log(city)
    Speciality.create({
        name: name,
        city_id: city
    }).then(
        post => res.redirect('/speciality/view?id='+post.id)
    ).catch(error =>
        Clinic.find({}).then(clinics => {
            res.render('speciality/create',{clinics: clinics, failureFlash: 'Не правильно ввели данные. Повторите попытку'});
        })
    );
});

router.get('/create', function(req, res, next) {
    Clinic.find({}).then(clinics => {
        res.render('speciality/create',{clinics: clinics});
    });
});

module.exports = router;