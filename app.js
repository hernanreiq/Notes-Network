const express = require('express');
const path = require('path');
const method_override = require('method-override');
const express_session = require('express-session');
const {format} = require('timeago.js');
const flash = require('connect-flash');
const passport = require('passport');

//initializations
const app = express();
require('./config/passport');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables
app.use((req, res, next)=> {
    app.locals.format = format;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || false;
    next();
});

// routes
app.use('/', routes_index);
app.use('/', routes_notes);
app.use('/', routes_users);

//Bloquea las rutas no definidas
app.use((req, res)=>{
    res.status(404).redirect('/');
});

module.exports = app;