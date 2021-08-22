const Note = require('../models/notes');

const index_controller = {
    home: async function (req, res) {
        const notes = await Note.find({visibility: true}).sort({_id: -1});
        res.render('index', {notes});
    }
};

module.exports = index_controller;