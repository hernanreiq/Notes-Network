const Note = require('../models/notes');

const user_controller = {
    profile: async function (req, res){
        const notes = await Note.find({user_id: req.params.id}).sort({_id: -1});
        res.render('profile', {notes});
    }
};

module.exports = user_controller;