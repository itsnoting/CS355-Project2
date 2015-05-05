/**
 * Created by kting_000 on 5/4/2015.
 */

var express = require('express');
var router = express.Router();

var db = require('../models/db');

router.get('/all', function(req, res){
    db.productGetAll(function(err, result){
        if(err) throw err;
        res.render("productTable", {rs: result});
    });
})

router.get('/', function(req, res){
    db.productGetByID(req.query.UPC, function(err, result){
        if(err) throw err;
        res.render("productInfo", {rs: result[0]});
        console.log(result);
    });
})

module.exports = router;