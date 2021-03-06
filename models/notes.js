const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesModel = Schema({
    title: {type: String},
    description: {type: String},
    visibility: {type: Boolean},
    created_at: {type: Date},
    user_id: {type: String}
});

module.exports = mongoose.model('note', notesModel);