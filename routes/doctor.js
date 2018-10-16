var express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const City = require('../models/city');
const Clinic = require('../models/clinic');
const Speciality = require('../models/speciality');
const promise = require('promise');

/* GET home page. */
router.get('/', function(req, res, next) {
    Doctor.find({}).then(doctors => {
        res.render('doctor/index',{doctors: doctors});
    })
});

router.post('/create', function(req, res, next) {
    const {title, body} = req.body;
    Doctor.create({
        title: title,
        body: body
    }).then(post => console.log(post.id));
    res.redirect('/post/list');
});

router.get('/create', function(req, res, next) {
    // console.log(City.find({}).then());
    // City.find({}).then(cities => {city = cities;});
    // Clinic.find({}).then(clinics => clinic = clinics);
    // Speciality.find({}).then(specialites => speciality = specialites);
    const [ cities, clinics, specialities ] = await promise.all([
        City.find(),
        Clinic.find(),
        Speciality.find()
    ])
    console.log(city); //city == null
    if(city != null && clinic != null && speciality != null)
        res.render('doctor/create',{ cities: city, clinics: clinic, specialites: speciality});
});

module.exports = router;