const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');

router.get('/:id/add', cartController.addCart); 
module.exports = router;
