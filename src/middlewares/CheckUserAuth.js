const dbUser = require('../database/dbUser');
const Validator = require('validatorjs');
const e = require('express');

module.exports = async function (req, res, next) {

    const RULE = {
        user_token: 'string|required'
    }

    let validation = new Validator(req.body, RULE);
    if (validation.fails()) {
        return res.json({
            success: false,
            message: validation.errors.get('user_token')[0]
        });
    }

    let user = await dbUser.checkUserToken(req.body.user_token);

    if (user.success) {

        req.user = user.data;

        return next();
    } else {
        return res.json(user);
    }

    
}