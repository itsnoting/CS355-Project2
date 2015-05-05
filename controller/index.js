/**
 * Created by kting_000 on 5/4/2015.
 */

var express = require('express');
var router = express.Router();

// Example 1: Return the home page
router.get('/', function(req, res){
    res.render('index');
});

router.get('/about', function(req, res){
    res.render('about');
});

module.exports = router;