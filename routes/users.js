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
router.get('/user/notes/:id', isAuthenticated, user_controller.my_notes);

//cerrar sesion
router.get('/user/logout', isAuthenticated, user_controller.logout);

module.exports = router;