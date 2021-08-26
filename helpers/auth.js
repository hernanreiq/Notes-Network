const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg', 'You must login first.');
        res.redirect('/user/login');
    }
}

module.exports = helpers;