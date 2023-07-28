const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const authorizationAccept = require('../middlewares/authorization/authorizationAccept');
const isAdmin = require('../middlewares/authorization/isAdmin');
const {upload} = require("../middlewares/multer");

/* GET home page. */
router.get('/', ProductController.getProducts);
router.get('/get/:id', ProductController.getOneProduct);

router.post('/add', upload, authorizationAccept, isAdmin, ProductController.addProduct);
router.post('/update/photo', upload, authorizationAccept, isAdmin, ProductController.updateProductPhoto);
router.post('/update', authorizationAccept, isAdmin, ProductController.updateProduct);
router.post('/delete', authorizationAccept, isAdmin, ProductController.deleteProduct);

router.post('/add/review', authorizationAccept, ProductController.addReviewInProduct);
router.get('/search/', ProductController.productSearch);

module.exports = router;
