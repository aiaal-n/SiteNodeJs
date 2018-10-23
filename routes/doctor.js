const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const City = require('../models/city');
const Clinic = require('../models/clinic');
const Speciality = require('../models/speciality');
const promise = require('promise');

/* GET home page. */
router.get('/', function(req, res, next) {
    Doctor.find({}).populate(['city','clinic','speciality']).then(doctors => {
        res.render('doctor/index',{doctors: doctors});
    })
});

router.post('/create', function(req, res, next) {
    const {lastName, firstName, secondName, birthdate, username, password, email, city, speciality, clinic} = req.body;
    Doctor.create({
        lastName: lastName,
        firstName: firstName,
        secondName: secondName,
        birthdate: birthdate,
        username: username,
        password: password,
        email: email,
        city: city,
        speciality: speciality,
        clinic: clinic
    }).then(doctor => res.redirect('/doctor/view?id='+doctor.id)).catch(async error => {
        console.error(error.code);
        if (error.code == '11000') {
            const [cities, clinics, specialities] = await (Promise.all([
                City.find(),
                Clinic.find(),
                Speciality.find()
            ]));
            if (cities != null && clinics != null && specialities != null)
                res.render('doctor/create', {
                    cities: cities,
                    clinics: clinics,
                    specialites: specialities,
                    failureFlash: 'Логин занят'
                });
        }
    });
    // res.redirect('/doctor/view?id=');
});

router.get('/create', async function (req, res, next) {
    const [cities, clinics, specialities] = await (Promise.all([
        City.find(),
        Clinic.find(),
        Speciality.find()
    ]));
    if (cities != null && clinics != null && specialities != null)
        res.render('doctor/create', {cities: cities, clinics: clinics, specialites: specialities});
});

router.get('/view', function(req, res, next) {
    Doctor.find({'_id':req.query.id}).populate(['city','clinic','speciality']).then(doctor => {
        res.render('doctor/view',{doctor: doctor, moment: require('moment')});
    });
});

router.get('/ajax-city', function(req, res, next) {
    Clinic.find({'city_id':req.query.city}).then(clinics => {
        console.log(clinics);
        var arr = ['<option selected="selected" disabled="true">Выберите клинику</option>'];
        for (var i=0;i<clinics.length; i++){
            arr.push('<option value='+clinics[i].id+'>'+clinics[i].name+'</option>');
        }
        res.send({clinics: arr});
    });
});

router.get('/ajax-clinic', function(req, res, next) {
    Speciality.find({'clinic_id':req.query.clinic}).then(specialites => {
        console.log(specialites);
        var arr = ['<option selected="selected" disabled="true">Выберите специальность</option>'];
        for (var i=0;i<specialites.length; i++){
            arr.push('<option value='+specialites[i].id+'>'+specialites[i].name+'</option>');
        }
        res.send({specialites: arr});
    });
});

router.get('/delete', function (req, res, next) {
    Doctor.findByIdAndRemove(req.query.id).then(res.redirect('/doctor'))
});

module.exports = router;