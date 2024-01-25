const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../auth');

const { verify, verifyAdmin} = auth;

router.post('/', verify, verifyAdmin, productController.createProduct);

router.get('/all', productController.getAllProducts);

// Route for updating a product (Admin)
router.put('/:productId', verify, verifyAdmin, productController.updateProduct);

// Route to archiving a product (Admin)
router.put('/:productId/archive', verify, verifyAdmin, productController.archive);

// Route to activating a product (Admin)
router.put('/:productId/activate', verify, verifyAdmin, productController.activate);

module.exports = router;
