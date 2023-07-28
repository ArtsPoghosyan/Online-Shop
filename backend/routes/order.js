const express = require('express');
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const authorizationAccept = require("../middlewares/authorization/authorizationAccept");

/* GET home page. */
router.get('/get', authorizationAccept, OrderController.getOrders);
router.get('/get/:id', authorizationAccept, OrderController.getOrder);

router.post('/add', authorizationAccept, OrderController.addOrder);


router.post("/create-paypal-order", authorizationAccept, OrderController.createPayPalOrder);
router.post("/capture-paypal-order", authorizationAccept, OrderController.capturePayPalOrder);


module.exports = router;