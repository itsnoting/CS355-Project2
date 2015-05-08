/**
 * Created by kting_000 on 5/7/2015.
 */
var express = require('express');
var router = express.Router();

var db = require('../models/db');

router.get('/all', function(req, res){
    db.storeGetAllView(function(err, result){
        if(err) throw err;
        res.render('storeTable', {rs: result});
    })
})

router.get('/add', function(req, res){
    res.render('storeCreateForm', {action: '/store/add'});
})

router.post('/add', function(req, res){
    db.storeInsert(req.body, function(err, result){
        if(err) throw err;
        db.storeGetByID(result.insertId, function(err, store){
            if(err) throw err;
            res.render('storeInsertSnippet', {rs: store})
        })

    })
})

router.get('/delete', function(req, res){
    db.storeDelete(req.query.StoreID, function(err, result){
        if(err) throw err;
        res.redirect('/store/all');
    })
})

router.get('/edit', function(req, res){
    db.storeGetByID(req.query.StoreID, function(err, result){
        if(err) throw err;
        res.render('storeEditForm', {rs: result, action: '/store/edit'});
    })
})

router.post('/edit', function(req, res){
    db.storeUpdate(req.body, function(err, result){
        if(err) throw err;
        db.storeGetByID(req.body.StoreID, function(err, result){
            if(err) throw err;
            res.render('storeInsertSnippet', {rs: result});
        })
    })
})

module.exports = router;