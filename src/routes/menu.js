const express = require('express');
const router = express.Router();
const menuController = require('../app/controllers/MenuController');

router.get('/', menuController.index); 
router.get('/tra-hoa-qua', menuController.trahoaqua);  
router.get('/tra-vai', menuController.travai);   
router.post('/tra-vai', menuController.travaiComment);  
router.get('/smoothies', menuController.smoothies); 
router.get('/ca-phe', menuController.caphe); 
router.get('/banh-ngot', menuController.banhngot); 

module.exports = router;
