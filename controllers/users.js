const Note = require('../models/notes');
const User = require('../models/users');

const user_controller = {
    profile: async function(req, res){
        res.send({message: "Hola " + req.user.name});
    },
    my_notes: async function (req, res){
        const notes = await Note.find({user_id: req.params.id}).sort({_id: -1});
        res.render('my_notes', {notes});
    },
    register: async function (req, res){
        res.render('register');
    },
    registered_user: async function(req, res){
        const {name, email, password, password_confirm} = req.body;
        const ExistenciaUsuario = await User.find({email: email}); 
        if(ExistenciaUsuario.length > 0){
            req.flash('error_msg', 'This email is already in use.');
            res.redirect('/user/register');
        } else if(name.length <= 0){
            req.flash('error_msg', 'You must enter a valid name.');
            res.redirect('/user/register');
        } else if(email.length <= 0){
            req.flash('error_msg', 'You have not entered an email.');
            res.redirect('/user/register');
        } else if(password == '' || password.length < 7){
            req.flash('error_msg', 'This password is not secure.');
            res.redirect('/user/register');
        } else if(password != password_confirm){
            req.flash('error_msg', 'Passwords are different.');
            res.redirect('/user/register');
        } else {
            const newUser = new User({name, email});
            newUser.password = await newUser.encryptPassword(password);
            newUser.created_at = Date.now();
            await newUser.save((err, userRegistered) => {
                if(userRegistered){
                    req.flash('success_msg', 'User registered successfully!');
                    res.redirect('/user/login');
                } else {
                    req.flash('error_msg', 'Something is wrong');
                    res.redirect('/user/register');
                }
            });
        }
    },
    login: function(req, res){
        res.render('login');
    },
    logined: function(req, res){
        res.redirect('/user/notes/' + req.user._id);
    },
    logout: function(req, res){
        req.logout();
        req.flash('success_msg', 'Session closed successfully!');
        res.redirect('/');
    }
};

module.exports = user_controller;