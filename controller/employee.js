/**
 * Created by kting_000 on 5/4/2015.
 */
var express = require('express');
var router = express.Router();

var db = require('../models/db');

router.get('/', function(req, res){
    db.employeeGetViewById(req.query.EmployeeID, function(err, result){
        if(err) throw err;
        res.render('employeeInfo', {rs: result[0]});
    })
});

router.get('/all', function(req, res){
   db.employeeGetAllView(function(err, result){
       if(err) throw err;
       res.render('employeeTable', {rs: result});
   })
});

router.get('/add', function(req, res){
    res.render('employeeCreateForm', {action: '/employee/add'});
})

router.post('/add', function(req, res){
    console.log(req.body);
    db.employeeInsert(req.body, function(err, result){
        if(err) throw err;
        db.employeeGetById(result.insertId, function(err, result){
            if(err) throw err;
            res.render("employeeInsertSnippet", {rs: result});
        })
    })
})

router.get('/delete', function(req, res){
    db.employeeDelete(req.query.EmployeeID, function(err, result){
        if(err) throw err;
        db.employeeGetAllView(function(err, result){
            res.redirect('/employee/all') ;
        })
    })
})

router.get('/edit', function(req, res){
    db.employeeGetById(req.query.EmployeeID, function(err, result){
        if(err) throw err;
        res.render('employeeEditForm', {rs: result, action: '/employee/edit'});
    })
})

router.post('/edit', function(req, res){
    console.log(req.body);
    db.employeeUpdate(req.body, function(err, result){
      if(err) throw err;
        db.employeeGetById(req.body.EmployeeID, function(err, result){
            if(err) throw err;
            res.render('employeeInsertSnippet', {rs: result});
        })

    })
})



module.exports = router;