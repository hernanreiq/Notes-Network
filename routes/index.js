const express = require('express');
const router = express.Router();
const index_controller = require('../controllers/index');

router.get('/', index_controller.home);
router.get('/about', index_controller.about);
router.get('/author', index_controller.author);
router.get('/dev', index_controller.dev);

module.exports = router;