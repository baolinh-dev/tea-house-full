const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');
 
router.get('/list', cartController.cartList);  
router.get('/:slug', cartController.addCart);  
module.exports = router;
