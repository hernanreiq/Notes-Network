const express = require('express');
const router = express.Router();

router.get('/users/login', (req, res) => {
    res.send({message: "Signin windows"});
});

router.get('/users/register', (req, res) => {
    res.send({message: "Signup windows"});
});

module.exports = router;