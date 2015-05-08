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
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        console.log(result)
        callback(false, result);
    });
}

exports.productInsert = function(product_info, callback){
    var query = 'INSERT INTO Product (Brand, Product_Name, VSN, Price, UPC) VALUES ("' +
        product_info.Brand + '", "' + product_info.Product_Name + '", "' + product_info.VSN + '", ' + product_info.Price + ', "' + product_info.UPC + '")';
    connection.query(query, function(err, result) {
        if (err) {
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        console.log(query);
        callback(false, result);
    });
}

exports.productDelete = function(UPC, callback){
    var query = 'DELETE FROM Product WHERE UPC = ' + UPC;
    connection.query(query, function(err, result) {
        if (err) {
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        console.log(query);
        callback(false, result);
    })
}

exports.productUpdate = function(product_info, callback){
    var query = 'UPDATE Product SET Brand="' + product_info.Brand + '", Product_Name="' + product_info.Product_Name +
        '", Price=' + product_info.Price + ', VSN="' + product_info.VSN + '", UPC="' + product_info.UPC +'" WHERE UPC=' + product_info.UPC;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        console.log(query);
        callback(false, result);
    })
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
exports.orderGetAllView = function(callback){
    var query = "SELECT * FROM Order_Full";
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return
        }
        callback(false, result);
    });
}

exports.initOrder = function(order_info, callback){
    var query = 'INSERT INTO Scoremore (EmployeeID, StoreID) VALUES (' + order_info.EmployeeID + ', ' + order_info.StoreID + ')';
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

exports.finalizeOrder = function(OrderID, callback){
    var query = "UPDATE Scoremore SET Date_Ordered = CURRENT_TIMESTAMP WHERE OrderID = " + OrderID;
    connection.query(query, function(err, result){
        if(err){
            console.log(err);
            console.log(query);
            callback(true);
            return;
        }
        console.log(query);
        callback(false, result);
    })
}

exports.cancelOrder = function(callback){
    var query = "DELETE FROM Scoremore WHERE Date_Ordered is null";
    connection.query(query, function(err, result){
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        console.log(query);
        callback(false, result);

    })
}

exports.employeeGetAll = function(callback){
    var query = 'SELECT * FROM Employee';
    connection.query(query, function(err, result){
        if(err){
            console.log(query, function(err, result){
                console.log(query);
                console.log(err);
                callback(true);
                return;
            })
            callback(false, result);
        }
    })
}

exports.employeeGetAllView = function(callback){
    var query = 'SELECT * FROM Employee_Full';
    connection.query(query, function(err, result){
        if(err){
                console.log(query);
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
    })
}

exports.employeeGetById = function(EmployeeID, callback){
    var query = "SELECT * FROM Employee WHERE EmployeeID = " + EmployeeID;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.employeeGetViewById= function(EmployeeID, callback){
    var query = 'SELECT * FROM Employee_Full WHERE EmployeeID=' + EmployeeID;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.employeeInsert = function(employee_info, callback){
    var query = 'INSERT INTO Employee (First_Name, Last_Name, Employee_Num) VALUES ("'
        + employee_info.First_Name + '", "' + employee_info.Last_Name + '", ' + employee_info.Employee_Num + ')'
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.employeeDelete = function(EmployeeID, callback){
    var query = 'DELETE FROM Employee WHERE EmployeeID = ' + EmployeeID;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
        console.log(result);
    })
}

exports.employeeUpdate = function(employee_info, callback){
    var query = 'UPDATE Employee SET First_Name="' + employee_info.First_Name +'", ' +
            'Last_Name="' + employee_info.Last_Name + '", ' +
            'Employee_Num=' + employee_info.Employee_Num +
            ' WHERE EmployeeID=' + employee_info.EmployeeID;
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.storeGetAllView = function(callback){
    var query = "SELECT * FROM Store_Full";
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.storeGetByID = function(StoreID, callback){
    var query = "SELECT * FROM Store WHERE StoreID = " + StoreID;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.storeInsert = function(store_info, callback){
    var query = "INSERT INTO Store (Store_Number, Address) values (" + store_info.Store_Number + ', "' + store_info.Address + '")'
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.storeDelete = function(StoreID, callback){
    var query = "DELETE FROM Store WHERE StoreID = " + StoreID;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.storeUpdate = function(store_info, callback){
    console.log(store_info);
    var query = "UPDATE Store SET Store_Number = " + store_info.Store_Number + ', Address = "' + store_info.Address + '" WHERE StoreID = ' + store_info.StoreID;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.cartProcedure = function(OrderID, callback){
    var query = "CALL Cart(" + OrderID + ')';
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.cartAddProduct = function(OrderID, UPC, callback){
    var query = "INSERT INTO Cart_Item (OrderID, UPC) VALUES (" + OrderID + ', "' + UPC + '")';
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        console.log(query);
        callback(false, result);
    })
}

exports.cartTotalSubquery = function(OrderID, callback){
    var query= "SELECT SUM(p.Price) as Total FROM Cart_Item JOIN Product as p on Cart_Item.UPC = p.UPC WHERE Cart_Item.OrderID =" +
        "(SELECT OrderID FROM Scoremore WHERE OrderID = " + OrderID + ")"
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
        }
        console.log(query);
        callback(false, result);
    })
}

exports.cartDelete = function(ItemID, callback){
    var query = "DELETE FROM Cart_Item WHERE ItemID=" + ItemID;
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
        }
        console.log(query);
        callback(false, result);
    })
}
