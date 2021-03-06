var express = require('express');
var router = express.Router();
const City = require('../models/city');

/* GET home page. */
router.get('/', function(req, res, next) {
    City.find({}).then(cities => {
        res.render('city/index',{cities: cities});
    })
});

router.post('/create', function(req, res, next) {
    const {name} = req.body;
    City.create({
        name: name
    }).then(
        post => res.redirect('/city/view?id='+post.id)
    ).catch(error =>
        res.render('city/index',{cites: cites, failureFlash: 'Не правильно ввели данные. Повторите попытку'})
    );
});

router.get('/create', function(req, res, next) {
    res.render('city/create');
});

router.get('/view', function(req, res, next) {
    City.find({'_id':req.query.id}).then(city => {
        res.render('city/view',{city: city});
    });
});

router.get('/delete', function (req, res, next) {
   City.findByIdAndRemove(req.query.id).then(res.redirect('/city'))
});

module.exports = router;