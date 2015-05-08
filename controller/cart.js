/**
 * Created by kting_000 on 5/4/2015.
 */
var express = require('express');
var router = express.Router();

var db = require('../models/db');

router.get('/current', function(req, res){
    db.openOrder(function(err, result){
        if(err) throw err;
        if(result[0]){
            console.log(result[0].OrderID);
            db.cartProcedure(result[0].OrderID, function(err, cart){
                if(err) throw err;
                //console.log(cart[0]);
                db.cartTotalSubquery(result[0].OrderID, function(err, total){
                    if(err) throw err;
                    res.render('cartTable', {rs: cart[0], total: total, isOrder: true, title: "Shopping Cart"});
                })
                //res.render('cartTable', {rs: cart[0], orderID: result[0].OrderID, title: "Shopping Cart"});
            });

        }
        else{
            //console.log(result[0].OrderID);
            res.redirect('/order/create');
        }
    });
})

router.get('/add', function(req, res){
    db.openOrder(function(err, open){
        if(err) throw err;
        //console.log(open);
        db.cartAddProduct(open[0].OrderID, req.query.UPC, function(err, result){
            if(err) throw err;
            res.redirect('/cart/current');
        });
    });
})

router.get('/delete', function(req, res){
    db.cartDelete(req.query.ItemID, function(err, result){
        if(err) throw err;
        res.redirect('/cart/current');
    })
})
module.exports = router;