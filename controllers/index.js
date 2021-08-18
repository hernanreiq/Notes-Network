const index_controller = {
    home: function (req, res) {
        if (res.status(200)) {
            res.render('index');
        }
    }
};

module.exports = index_controller;