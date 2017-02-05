var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    passport.use(new LocalStrategy({
        //U anvodnicima je ime i nput filda ko u index.ejs
        usernameField: 'userName',
        passwordField: 'password'
    }, function (username, password, done) {
        var user = {
            username: username,
            password: password
        };
        done(null, user);
    }));
};
