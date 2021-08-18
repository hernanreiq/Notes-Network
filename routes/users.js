const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send({message: "Signin windows"});
});

router.get('/users/signup', (req, res) => {
    res.send({message: "Signup windows"});
});

module.exports = router;