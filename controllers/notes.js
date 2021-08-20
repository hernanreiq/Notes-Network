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
    }, 
    edit: async function(req, res){
        if(res.status(200)){
            const note = await notes_model.findById(req.params.id);
            res.render('edit-note', {note});
        }
    },
    update_note: async function(req, res){
        if(res.status(200)){
            const note = await notes_model.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                visibility: req.body.visibility == 'Public' ? true : false,
                created_at: Date.now()
            }, {new:true}, (err, noteUpdated) => {
                if(noteUpdated){
                    res.redirect('/');
                } else {
                    res.redirect('/note/edit/', req.params.id);
                }
            })
        }
    }
};

module.exports = notes_controller;