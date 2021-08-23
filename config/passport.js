const UserModel = require('../models/users');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

//BUSCAR Y AUTENTICAR EL USUARIO ANTES DE INICIAR LA SESION
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done) {
    UserModel.findOne({ email: email }, async function(err, user) {
        var resultMatch = await user.verifyPassword(password);
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'This email is not registered.' }); }
        if (!resultMatch) { 
            return done(null, false, { message: 'Incorrect password.' }); 
        } else {
            return done(null, user);
        }
    });
  }
));

//ALMACENANDO EL ID DEL USUARIO EN UNA SESION
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//TOMAR EL ID DEL USUARIO PARA PODER USAR SUS DATOS
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});