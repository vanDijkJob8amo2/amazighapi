const cookieParser = require('cookie-parser');
const { Router } = require('express');

const express = require('express');
const router = express.Router();
const CategoryController = require('../src/controllers/CategoryController');
const CheckUserAuth = require('../src/middlewares/CheckUserAuth');
const UserController = require('../src/controllers/UserController');

/* GET status */
router.get('/', (req, res, next) => { res.send(`Success! AmazighAPI VER 1.0.0`); });

router.get('/user/requestToken/:language', UserController.requestUserToken) 

router.use(CheckUserAuth);

// Category routes.
router.get('/category', CategoryController.index);
// router.get('/category/:id', CategoryController.get);
router.post('/category', CategoryController.store);
router.delete('/category/:id', CategoryController.destroy);

module.exports = router;
