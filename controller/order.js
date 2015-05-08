/**
 * Created by kting_000 on 5/4/2015.
 */
var express = require('express');
var router = express.Router();

var db = require('../models/db');

router.get('/all', function(req, res){
    db.orderGetAllView(function(err, result){
        if(err) throw err;
            db.openOrder(function(err, open){
                //console.log(open);
                if(err) throw err;
                res.render('orderTable', {rs: result, op: open});
        });
    });
});

router.get('/', function(req, res){
    db.cartProcedure(req.query.OrderID, function(err, result){
        if(err) throw err;
        console.log(result);
        db.cartTotalSubquery(req.query.OrderID, function(err, total){
            res.render('cartTable', {rs: result[0], total: total, isOrder: false, title: "Order Information"});
        })
    })
})

router.get('/create', function(req, res){
    db.employeeGetAllView(function(err, employee){
        if(err) throw err;
        db.storeGetAllView(function(err, store){
            if(err) throw err;
            console.log(store);
            res.render('orderCreateForm', {action: '/order/create', rs: employee, store: store});
        });
    });
});

router.post('/create', function(req, res){
    console.log(req.body);
    db.initOrder(req.body, function(err, result){
        if(err) throw err;
        res.redirect('/product/all');
    })
});

router.get('/finalize', function(req, res){
    db.openOrder(function(err, result){
        if(err) throw err;
        console.log(result[0]);
        db.finalizeOrder(result[0].OrderID, function(err, finalize){
            if(err) throw err;
            res.redirect('/order/all');
        })
    })
})

router.get('/cancel', function(req, res){
    db.cancelOrder(function(err, result){
        if(err) throw err;
        res.redirect('/');
    })
})

module.exports = router;