const express = require('express');
const router = express.Router();
const notes_controller = require('../controllers/notes');
const { isAuthenticated } = require('../helpers/auth');

router.get('/note/add', isAuthenticated, notes_controller.add);
router.post('/note/add', isAuthenticated, notes_controller.new_note);
router.get('/note/edit/:id', isAuthenticated, notes_controller.edit);
router.put('/note/edit/:id', isAuthenticated, notes_controller.update_note);
router.delete('/note/delete/:id', isAuthenticated, notes_controller.delete_note);

module.exports = router;