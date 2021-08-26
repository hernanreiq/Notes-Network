const Note = require('../models/notes');
const User = require('../models/users');

const user_controller = {
    profile: function(req, res){
        if(req.user._id == req.params.id){
            res.render('profile');
        } else {
            req.flash('error_msg', 'You can\'t see someone else\'s data');
            res.redirect('/user/profile/' + req.user._id);
        }
    },
    notes: async function (req, res){
        if(req.user._id == req.params.id){
            const notes = await Note.find({user_id: req.params.id}).sort({_id: -1});
            res.render('notes', {notes, owner: true});
        } else if(req.user._id != req.params.id){
            const notes = await Note.find({user_id: req.params.id, visibility: true}).sort({_id: -1});
            if(notes.length > 0){
                res.render('notes', {notes, owner: false});
            } else {
                req.flash('error_msg', 'This user has no public notes');
                res.redirect('/');
            }
        }
    },
    register: function (req, res){
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
    },
    changes: function(req, res){
        if(req.user._id == req.params.id){
            res.render('changes-data');
        } else {
            req.flash('error_msg', 'You cannot edit someone else\'s profile');
            res.redirect('/user/profile/' + req.user._id);
        }
    },
    change_name: async function(req, res){
        if(req.user._id == req.params.id){
            const {name} = req.body;
            if(name.length > 0){
                await User.findByIdAndUpdate(req.user._id,{name: name}, {new: true}, (err, userUpdated) => {
                    if(!userUpdated){
                        req.flash('error_msg', 'Your name could not be updated');
                    } else if(res.status(200)){
                        req.flash('success_msg', 'Your name was successfully updated!');
                    }
                });
            } else {
                req.flash('error_msg', 'Your name could not be updated');
            }
        } else {
            req.flash('error_msg', 'You cannot edit someone else\'s profile');
        }
        return res.redirect('/user/profile/' + req.user._id);
    },
    change_email: async function(req, res){
        if(req.user._id == req.params.id){
            const {email} = req.body;
            if(email.length > 0){
                await User.find({email: email}, async function (err, userData){
                    if(userData.length > 0){
                        req.flash('error_msg', 'This email is already in use');
                    } else {
                        await User.findByIdAndUpdate(req.user._id,{email: email}, {new: true}, (err, userUpdated) => {
                            if(userUpdated){
                                req.flash('success_msg', 'Your email was successfully updated!');
                            } else {
                                req.flash('error_msg', 'Your email could not be updated');
                            }
                        });
                    }
                });
            } else {
                req.flash('error_msg', 'Your email could not be updated');
            }
        } else {
            req.flash('error_msg', 'You cannot edit someone else\'s profile');
        }
        res.redirect('/user/profile/' + req.user._id);
    },
    change_password: async function(req, res){
        if(req.user._id == req.params.id){
            const {password, new_password, new_password_confirm} = req.body;

        } else {
            req.flash('error_msg', 'You cannot edit someone else\'s profile');
        }
        res.redirect('/user/profile/' + req.user._id);
    }
};

module.exports = user_controller;