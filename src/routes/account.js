const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController');

router.get('/register', accountController.register); 
router.get('/login', accountController.login);   
router.post('/store', accountController.store);  
router.post('/enter', accountController.enter); 
module.exports = router;
