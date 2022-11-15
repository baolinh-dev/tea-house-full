const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController'); 
const multer  = require('multer')  
const appRoot = require('app-root-path'); 
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img/avatar");
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

router.get('/register', accountController.register); 
router.get('/login', accountController.login);   
router.get('/logout', accountController.logout);   
router.get('/upload-avatar', accountController.uploadAvatar);    
router.post('/upload-profile-pic', upload.single('profile_pic'), accountController.handleUploadFile)
router.post('/store', accountController.store);  
router.post('/enter', accountController.enter); 
module.exports = router;
