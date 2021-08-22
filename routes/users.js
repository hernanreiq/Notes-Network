const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/users');

router.get('/users/login', (req, res) => {
    res.send({message: "Signin windows"});
});

router.get('/user/register', user_controller.register);
router.post('/user/register', user_controller.registered_user);
router.get('/user/profile/:id', user_controller.profile);

module.exports = router;