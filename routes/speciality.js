var express = require('express');
var router = express.Router();
const Speciality = require('../models/speciality');
const Clinic = require('../models/clinic');
const Service = require('../models/service');

/* GET home page. */
router.get('/', async function (req, res, next) {
    const specialites = await Speciality.find({}).populate('clinic_id');
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

router.get('/view', async function (req, res, next) {
    const [speciality, services] = await (Promise.all([
        Speciality.find({'_id': req.query.id}).populate('clinic_id'),
        Service.find({'speciality': req.query.id}),
    ]));

    if (speciality != null && services != null)
        res.render('speciality/view', {speciality: speciality, services: services});
});

router.get('/delete', function (req, res, next) {
    Speciality.findByIdAndRemove(req.query.id).then(res.redirect('/speciality'))
});

module.exports = router;