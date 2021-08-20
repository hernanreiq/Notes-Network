const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/users');

router.get('/users/login', (req, res) => {
    res.send({message: "Signin windows"});
});

router.get('/users/register', (req, res) => {
    res.send({message: "Signup windows"});
});

router.get('/user/profile/:id', user_controller.profile);

module.exports = router;