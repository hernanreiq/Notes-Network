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
            const {title, description, visibility} = req.body;
            note.title = title;
            note.description = description;
            note.visibility = visibility == 'Public' ? true : false;
            note.created_at = Date.now();
            note.user_id = 'Todavía no';
            await note.save();
            req.flash('success_msg', 'Note created successfully!');
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
            const {title, description, visibility} = req.body;
            const note = await notes_model.findByIdAndUpdate(req.params.id, {
                title: title,
                description: description,
                visibility: visibility == 'Public' ? true : false,
                created_at: Date.now()
            }, {new:true}, (err, noteUpdated) => {
                if(noteUpdated){
                    req.flash('success_msg', 'Note updated successfully!');
                    res.redirect('/');
                } else {
                    res.redirect('/note/edit/', req.params.id);
                }
            })
        }
    },
    delete_note: async function(req, res){
        if(res.status(200)){
            await notes_model.findByIdAndDelete(req.params.id, (err, noteDeleted) => {
                if(noteDeleted){
                    req.flash('success_msg', 'Note deleted successfully!');
                    res.redirect('/');
                } else {
                    res.redirect('/');
                }
            });
        }
    }
};

module.exports = notes_controller;