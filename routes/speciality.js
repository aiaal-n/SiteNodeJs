var express = require('express');
var router = express.Router();
const Speciality = require('../models/speciality');
const Clinic = require('../models/clinic');
const promise = require('promise');

/* GET home page. */
router.get('/', async function (req, res, next) {
    const specialites = await Speciality.find({}).populate('clinic_id');

    // const spec = await new Promise((resolve, reject) => {
    //     for (let i = 0; i < specialites.length; i++) {
    //         Clinic.find({'_id': specialites[i].clinic_id.toString()}).populate(clinic => {
    //             console.log(clinic[0].name);
    //             specialites[i].clinic_id = clinic[0].name;
    //             console.log(specialites[i].clinic_id)
    //         });
    //     }
    //     resolve(specialites)
    // });
    console.log(specialites)
    console.log("ya")
    res.render('speciality/index', {specialites: specialites});
});

router.post('/create', function(req, res, next) {
    const {name, clinic} = req.body;
    Speciality.create({
        name: name,
        clinic_id: clinic
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

router.get('/view', function(req, res, next) {
    Speciality.find({'_id':req.query.id}).populate('clinic_id').then(speciality => {
        res.render('speciality/view',{speciality: speciality});
    });
});

module.exports = router;