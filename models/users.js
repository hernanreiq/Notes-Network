const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const usersModel = Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    created_at: {type: Date}
});

//ENCRIPTACION DE LA CONTRASEÑA PARA EL REGISTRO
usersModel.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};
//DESENCRIPTAR CONTRASEÑA PARA EL INICIO DE SESION
usersModel.methods.matchPassword = async function (password){
    //Compara la contraseña ingresada con la que ya está guardada
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('user', usersModel);