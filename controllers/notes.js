const notes_model = require('../models/notes');

const notes_controller = {
    add: function(req, res) {
        if (res.status(200)){
            res.render('add-note');
        }
    },
    new_note: async function(req, res){
        if(res.status(200) && (req.body.title != '') && (req.body.description != '') && (req.body.visibility != '')){
            const note = new notes_model();
            note.title = req.body.title;
            note.description = req.body.description;
            note.visibility = req.body.visibility == 'Public' ? true : false;
            note.created_at = Date.now();
            note.user_id = 'Todavía no';
            await note.save();
            res.redirect('/');
        } else {
            res.redirect('/note/add');
        }
    }
};

module.exports = notes_controller;