var express = require('express');
var router = express.Router();
const User = require('../models/user');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
var sess;

/* GET home page. */
router.get('/sign-up', function(req, res, next) {
    res.render('auth/sign-up');
});

router.post('/sign-up', function(req, res, next) {
    const {lastName, firstName, secondName, username, email, password} = req.body;
    var regexp = /^[a-z_\-\.]+$/i;
    if(!regexp.test(username)) {
        console.log("введите только латинские символы");
        res.render('auth/sign-up', {failureFlash: 'Введите только латинские символы'});
        return false;
    } else {
        User.create({
            lastName: lastName,
            firstName: firstName,
            secondName: secondName,
            username: username,
            email: email,
            password: password
        }).then(post => console.log(post.id)).catch(error => {
            if (error.code == 11000) {
                res.render('auth/sign-up', {failureFlash: 'Логин занят'});
            }
        });
        res.redirect('/auth/sign-in');
    }
    // res.redirect('/auth/sign-in');
});

router.get('/sign-in', function(req, res, next) {
    res.render('auth/sign-in');
});


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         User.findOne({
//             username: username
//         }, function(err, user) {
//             if (err) {
//                 return done(err);
//             }
//
//             if (!user) {
//                 return done(null, false);
//             }
//
//             user.comparePassword(password, function(err, isMatch) {
//                 if (err) throw err;
//                 console.log('Password:', isMatch); // -&gt; Password123: true
//                 if(!isMatch){
//                     return done(null, false);
//                 }
//             });
//             return done(null, user);
//         });
//     }
// ));


router.post('/sign-in',
    function(req, res, next) {
    const {username, password} = req.body;
    User.findOne({ username: username }, function(err, user) {
        if (err) throw err;
        console.log("user = "+username+" pass = "+password);
        // test a matching password
        if(user != null) {
            user.comparePassword(password, function (err, isMatch) {
                if (err) throw err;
                console.log('Password:', isMatch); // -&gt; Password123: true
                if (isMatch) {
                    sess = req.session;
                    sess.username = username;
                    res.end('done');
                    res.redirect('/');
                    // req.login(user, function(err) {
                    //     if (err) { return next(err); }
                    //     return res.redirect('/users/' + req.user.username);
                    // });
                } else {
                    res.render('auth/sign-in', {failureFlash: 'Не правильно ввели пароль'});
                }
            });
        } else {
            res.render('auth/sign-in', {failureFlash: 'Не правильно ввели логин'});
        }
    });

    // passport.authenticate('local', { failureRedirect: '/error' }),
    //     function(req, res) {
    //         res.redirect('/success?username='+req.user.username);
    //     });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;