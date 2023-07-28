const express = require('express');
const UserController = require('../controllers/UserController');
const checkEmail = require("../middlewares/register/checkEmail");
const registerValidator = require("../middlewares/register/registerValidator");
const loginValidator = require("../middlewares/login/loginValidator");
const checkUser = require("../middlewares/login/checkUser");
const checkToken = require("../middlewares/login/checkToken");
const authorizationIgnore = require("../middlewares/authorization/authorizationIgnore");
const authorizationAccept = require("../middlewares/authorization/authorizationAccept");
const router = express.Router();

/* POST users listing. */

router.post('/login', authorizationIgnore, loginValidator, checkUser, checkToken, UserController.login);
router.post('/register', authorizationIgnore, registerValidator, checkEmail, UserController.register);
router.get('/logout', authorizationAccept, UserController.logout);

router.post('/update', authorizationAccept, UserController.update);


module.exports = router;