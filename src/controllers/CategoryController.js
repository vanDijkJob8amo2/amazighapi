const Validator = require('validatorjs');
const dbCategory = require('../database/dbCategory');

class CategoryController {

    index = async (req, res) => {

        let data = await dbCategory.getAllCategories(req.user.language);

        return res.json(data);
    }

    store = async (req, res) => {
        const RULES = {
            name_en: 'string',
            name_nl: 'string',
            name_am: 'string'
        }

        let validation = new Validator(req.body, RULES);
        if (validation.fails()) {
            return res.json({
                success: false,
                message: validation.errors.first()
            });
        }

        let data = await dbCategory.createNewCategory(req.body);

        return res.json(data);
    }

    destroy = async (req, res) => {
        return res.json({
            message: "Success!"
        });
    }

}

module.exports = new CategoryController;