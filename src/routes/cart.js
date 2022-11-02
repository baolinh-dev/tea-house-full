const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');
 
router.get('/:slug', cartController.addCart);  
module.exports = router;
