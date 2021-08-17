const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send({message: "Hi users"});
});

module.exports = router;