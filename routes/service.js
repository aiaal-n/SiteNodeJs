var express = require('express');
var router = express.Router();
const Service = require('../models/service');

/* GET home page. */
router.get('/', function(req, res, next) {
    Service.find({}).then(services => {
        res.render('service/index',{services: services});
    })
});

router.post('/create', function(req, res, next) {
    const {name} = req.body;
    const spec = req.query.id;
    Service.create({
        speciality: spec,
        name: name
    }).then(
        post => res.redirect('/service/view?id='+post.id)
    ).catch(error =>
        res.render('service/index',{cites: cites, failureFlash: 'Не правильно ввели данные. Повторите попытку'})
    );
});

router.get('/create', function(req, res, next) {
    res.render('service/create');
});

router.get('/view', function(req, res, next) {
    Service.find({'_id':req.query.id}).then(service => {
        res.render('service/view',{service: service});
    });
});

router.get('/delete', function (req, res, next) {
    Service.findByIdAndRemove(req.query.id).then(res.redirect('/doctor'))
});

module.exports = router;