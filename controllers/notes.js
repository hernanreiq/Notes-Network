const notes_controller = {
    add: function(req, res) {
        if (res.status(200)) {
            res.render('add-note');
        }
    },
    new_note: function(req, res){
        if(res.status(200)){
            console.log(req.body);
            res.send({message: "Nota creada con éxito!"});
        }
    }
};

module.exports = notes_controller;