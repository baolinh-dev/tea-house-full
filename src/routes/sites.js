const express = require('express');
const router = express.Router();
const sitesController = require('../app/controllers/SitesController');

router.get('/contact', sitesController.contact); 
router.post('/contact/post-feedback', sitesController.postFeedback);
router.get('/news', sitesController.news);
router.get('/introduce', sitesController.introduce);


module.exports = router;
