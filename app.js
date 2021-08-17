const express = require('express');
const path = require('path');
const method_override = require('method-override');
const express_session = require('express-session');

//initializations
const app = express();

//routes file
const routes_index = require('./routes/index');
const routes_notes = require('./routes/notes');
const routes_users = require('./routes/users');

//settings 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(method_override('_method'));
app.use(express_session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//global variables

// routes
app.use('/', routes_index);
app.use('/', routes_notes);
app.use('/', routes_users);


module.exports = app;