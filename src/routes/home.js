const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.index);
router.get('/ca-phe', homeController.caphe);
router.get('/smoothies', homeController.smoothies);
router.get('/banh-ngot', homeController.banhngot);
// router.get('/contact', homeController.contact);
// router.get('/news', homeController.news);

module.exports = router;
