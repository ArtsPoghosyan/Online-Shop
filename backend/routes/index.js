const express = require('express');
const authRouter = require("./auth"); 
const productRouter = require("./product"); 
const orderRouter = require("./order"); 
const authorizationAccept = require("../middlewares/authorization/authorizationAccept");
const UserController = require('../controllers/UserController');
const router = express.Router();

/* GET home page. */
router.get('/', authorizationAccept, UserController.index);

router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);

module.exports = router;
