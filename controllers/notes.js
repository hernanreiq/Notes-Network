const notes_controller = {
    add: function(req, res) {
        if (res.status(200)) {
            res.render('add-note');
        }
    }
};

module.exports = notes_controller;