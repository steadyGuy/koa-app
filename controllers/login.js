const { use } = require('../app');
const { pass } = require('../libs/connection');
const passport = require('../libs/passport');
const User = require('../models/User')

module.exports.login = async (ctx, next) => {

    // const {email, password} = ctx.request.body;

    // const user = await User.findOne({email});
    // const isValid = await user.checkPassword(password);

    // if(!isValid) ctx.throw(401);
    // ctx.body = 'Welcome';

    await passport.authenticate('local', async (err, user, info) => {
        if (err) throw err;

        if(!user) {
            ctx.status = info.status;
            ctx.body = {error: info.message};
            return;
        }

        ctx.body = {token: 'token'};
    })(ctx, next);
}