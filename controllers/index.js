const Note = require('../models/notes');

const index_controller = {
    home: async function (req, res) {
        const notes = await Note.find({visibility: true}).sort({_id: -1});
        res.render('index', {notes});
    },
    about: function(req, res){
        res.render('about');
    },
    author: function(req, res){
        res.redirect('https://bit.ly/hernanreiq');
    },
    dev: function(req, res){
        res.redirect('https://github.com/hernanreiq/Notes-Network');
    }
};

module.exports = index_controller;