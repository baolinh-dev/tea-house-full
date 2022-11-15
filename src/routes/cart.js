const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController'); 
 
router.get('/list', cartController.cartList);  
router.get('/cancel', cartController.cancel);  
router.get('/detail',  cartController.cartDetail);  
router.post('/list', cartController.saveCartList);  
router.get('/:slug', cartController.addCart);  
module.exports = router;
