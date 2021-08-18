const express = require('express');
const router = express.Router();
const notes_controller = require('../controllers/notes');
router.get('/note/add', notes_controller.add);

module.exports = router;