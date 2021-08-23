const Note = require('../models/notes');
const User = require('../models/users');

const user_controller = {
    profile: async function (req, res){
        const notes = await Note.find({user_id: req.params.id}).sort({_id: -1});
        res.render('profile', {notes});
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
    logined_user: async function(req, res){
        
    }
};

module.exports = user_controller;