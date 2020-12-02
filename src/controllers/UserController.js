const dbUser = require('../database/dbUser');
const Validator = require('validatorjs');

class UserController {

    requestUserToken = async (req, res) => {

        const RULE = {
            language: 'required|string|size:2|alpha'
        }

        console.log(req.params);

        let validation = new Validator(req.params, RULE);
        if (validation.fails()) {
            return res.json({
                success: false,
                message: validation.errors.all()
            });
        }

        let user = await dbUser.createUserToken(req.params.language);
        
        return res.json(user);
    }

}

module.exports = new UserController;