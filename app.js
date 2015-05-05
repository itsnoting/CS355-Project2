// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/index');
var employee_route = require('./controller/employee');
var product_route = require('./controller/product');
var order_route = require('./controller/order');
var cart_route = require('./controller/cart');
// initialize express web application framework
// http://expressjs.com/
var app = express();

// allow json data to be parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// example of a global variable that can be passed to a template
app.set('subtitle', 'Scoremore');

//configure routes
app.use('/', routes);
app.use('/employee', employee_route);
app.use('/product', product_route);
app.use('/order', order_route);
app.use('/cart', cart_route);

// configure static directory for javascript, css, etc.
app.use(express.static('public'));

app.set('port', 3000);  //use your own port
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));