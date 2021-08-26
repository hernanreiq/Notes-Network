const notes_model = require('../models/notes');

const notes_controller = {
    add: function(req, res) {
         res.render('add-note');
    },
    new_note: async function(req, res){
        if((req.body.title != '') && (req.body.description != '') && (req.body.visibility != '')){
            const note = new notes_model();
            const {title, description, visibility} = req.body;
            note.title = title;
            note.description = description;
            note.visibility = visibility == 'Public' ? true : false;
            note.created_at = Date.now();
            note.user_id = req.user._id;
            await note.save();
            req.flash('success_msg', 'Note created successfully!');
            res.redirect('/');
        } else {
            res.redirect('/note/add');
        }
    }, 
    edit: async function(req, res){
        const note = await notes_model.findById(req.params.id);
        if(req.user._id == note.user_id){
            res.render('edit-note', {note});
        } else {
            req.flash('error_msg', 'You cannot edit another user\'s notes');
            res.redirect('/user/notes/' + req.user._id);
        }
    },
    update_note: async function(req, res){
        const note = await notes_model.findById(req.params.id);
        if(req.user._id == note.user_id){            
            const {title, description, visibility} = req.body;
            await notes_model.findByIdAndUpdate(req.params.id, {
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
            });
        } else {
            req.flash('error_msg', 'You cannot edit another user\'s notes');
            res.redirect('/user/notes/' + req.user._id);
        }
    },
    delete_note: async function(req, res){
        const note = await notes_model.findById(req.params.id);
        if(req.user._id == note.user_id){
            await notes_model.findByIdAndDelete(req.params.id, (err, noteDeleted) => {
                if(noteDeleted){
                    req.flash('success_msg', 'Note deleted successfully!');
                } else {
                    req.flash('error_msg', 'The note could not be deleted');
                }
            });
        } else {
            req.flash('error_msg', 'You cannot delete another user\'s note');
        }
        res.redirect('/user/notes/' + req.user._id);
    }
};

module.exports = notes_controller;