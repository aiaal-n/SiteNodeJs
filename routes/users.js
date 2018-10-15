var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}).then(users => {
        res.render('user/index',{users: users});
    })
});

module.exports = router;
