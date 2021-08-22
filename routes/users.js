const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/users');

router.get('/users/login', (req, res) => {
    res.send({message: "Signin windows"});
});
//registro
router.get('/user/register', user_controller.register);
router.post('/user/register', user_controller.registered_user);
//inicio de sesion
router.get('/user/login', user_controller.login);
router.post('/user/login', user_controller.logined_user);
//perfil
router.get('/user/profile/:id', user_controller.profile);

module.exports = router;