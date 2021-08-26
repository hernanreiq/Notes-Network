const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/users');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

//registro
router.get('/user/register', user_controller.register);
router.post('/user/register', user_controller.registered_user);
//inicio de sesion
router.get('/user/login', user_controller.login);
router.post('/user/login', passport.authenticate('local', {failureRedirect: '/user/login', failureFlash: true}), user_controller.logined);
//perfil
router.get('/user/profile/:id', isAuthenticated, user_controller.profile);
router.get('/user/notes/:id', isAuthenticated, user_controller.notes);
//cambiar datos del perfil
router.get('/user/changes/:id', isAuthenticated, user_controller.change_data);
router.put('/user/change/name/:id', isAuthenticated, user_controller.change_name);
router.put('/user/change/email/:id', isAuthenticated, user_controller.change_email);
router.put('/user/change/password/:id', isAuthenticated, user_controller.change_password);
//cerrar sesion
router.get('/user/logout', isAuthenticated, user_controller.logout);

module.exports = router;