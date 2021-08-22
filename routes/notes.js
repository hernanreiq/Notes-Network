const express = require('express');
const router = express.Router();
const notes_controller = require('../controllers/notes');

router.get('/note/add', notes_controller.add);
router.post('/note/add', notes_controller.new_note);
router.get('/note/edit/:id', notes_controller.edit);
router.put('/note/edit/:id', notes_controller.update_note);

module.exports = router;