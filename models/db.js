/**
 * Created by kting_000 on 5/4/2015.
 */

var mysql   = require('mysql');
var db  = require('../models/db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.productGetAll = function(callback){
    var query = "SELECT * FROM Product"
    connection.query(query, function(err, result){
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        console.log(query);
        callback(false, result);
    });

}

exports.productGetByID = function(UPC, callback){
    var query= "SELECT * FROM Product WHERE UPC = " + UPC;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        console.log()
        callback(false, result);
    });
}

exports.openOrder = function(callback){
    var query = "SELECT * FROM Scoremore WHERE Date_Ordered is null";
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    });
}

exports.initOrder = function(EmpID, StoreID, callback){
    var query = 'INSERT INTO Scoremore (EmployeeID, StoreID) VALUES (' + EmpID + ', ' + StoreID + ')';
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    });
}

