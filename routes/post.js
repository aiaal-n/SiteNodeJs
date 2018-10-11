var express = require('express');
var router = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('post/index');
});

router.post('/', function(req, res, next) {
    const {title, body} = req.body;
    Post.create({
        title: title,
        body: body
    }).then(post => console.log(post.id));
    res.redirect('/post/list');
});

router.get('/list', function(req, res, next) {
    Post.find({}).then(posts => {
        res.render('post/list',{posts: posts});
    })
});

module.exports = router;