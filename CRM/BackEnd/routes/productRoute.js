const express = require('express'); 
const Product = require('../models/product');
const router = express.Router(); 
const productController = require("../controllers/productController");
//add one product
router.post('/', productController.createProduct);
 // get all products
router.get('/', productController.getProducts);
//get one product
router.get('/:id', productController.getProductById);
//update a product
router.put('/:id', productController.updateProduct);
//delete a product
router.delete('/:id', productController.deleteProduct);
module.exports = router;