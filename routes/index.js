var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var arr3 = [ 'cat', 'rat', 'bat' ];
  res.render('index', { title: 'Express', username: 'habib', userPosts: arr3});
});

module.exports = router;
