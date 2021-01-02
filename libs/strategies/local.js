const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    function(email, password, done) {
        console.log('local strategy', email, password);


        done(null, false, {status: 400, message: 'Стратегия еще не настроена'})
    }
)