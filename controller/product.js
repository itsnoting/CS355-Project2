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

router.get('/add', function(req, res){
    res.render('productCreateForm', {action: '/product/add'});
})

router.post('/add', function(req, res){
    db.productInsert(req.body, function(err, result){
        if(err) throw err;
        db.productGetByID(req.body.UPC, function(err, result){
            if(err) throw err;
            res.render("productInsertSnippet", {rs: result});
        })

    })
})

router.get('/edit', function(req, res){
    db.productGetByID(req.query.UPC, function(err, result){
        if(err) throw err;
        res.render('productEditForm', {action: '/product/edit', rs: result});
    })

})

router.post('/edit', function(req, res){
    db.productUpdate(req.body, function(err, result){
        if(err) throw err;
        db.productGetByID(req.body.UPC, function(err, product){
            if(err) throw err;
            res.render('productInsertSnippet', {rs: product});
        })
    })
})

router.get('/delete', function(req, res){
    db.productDelete(req.query.UPC, function(err, result){
        if(err) throw err;
        res.redirect('/product/all');
    })
})

module.exports = router;