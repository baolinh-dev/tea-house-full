const Account = require('../models/Account')    
const Product = require('../models/Product') 
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose'); 
const jwt = require('jsonwebtoken');   
const multer  = require('multer')  
const { json } = require('express'); 
const { FALSE } = require('node-sass');

class AccountController {  
    // [GET] /account/register
    register(req, res, next) {
        var name = req.cookies.name
        res.render('account/register', {   
            layout: false,
            name,
        })
    }  
    // [POST] /account/store
    store(req, res, next) { 
        // Nếu tài khoản bị trùng 
        Account.findOne({ 
            username: req.body.username
        })   
        .then(data => { 
            if(data) {  
                res.json('Đã trùng username')
            } else { 
                const account = new Account(req.body);
                account
                    .save()  
                    .then(() => res.redirect('/account/login'))
                    .catch(next);
            }
        })  
        .catch(next);
        // Tạo mới một Object theo kiểu Constructor
    }
    // [GET] /account/login
    login(req, res, next) { 
        res.render('account/login', {   
            layout: false,
        })
    }    
    logout(req, res, next) { 
        res.clearCookie('name')  
        res.clearCookie('token') 
        res.clearCookie('avatr')  
        req.session.destroy();
        res.redirect('/account/login')
    }    
    // [POST] /account/enter 
    enter(req, res, next) {
  var username = req.body.username
  var password = req.body.password   
      Account.findOne({ username, password })
              .then((accounts) => {  
                  if(accounts) {    
                      var token = jwt.sign({ _id: accounts._id},'matkhau')     
                      res.setHeader('Content-Type', 'text/html');
                      res.cookie('token', token) 
                      res.cookie('name', accounts.name)    
                      res.cookie('avatar', accounts.avatar)
                      if(accounts.role === 'user') {  
                        // redirect
                        res.redirect('/')
                      } else if (accounts.role === 'admin') {   
                        // redirect 
                        res.redirect('/admin/account')
                      }
                  } else { 
                      res.json('Dang nhap that bai')
                  }
              }) 
              .catch(next);
    } 
    uploadAvatar(req, res, next) {  
        var nameCookies = req.cookies.name 
        Account.find({ "name": nameCookies}) 
            .then((accounts) => { 
                var nameUser = accounts[0].name
                var emailUser = accounts[0].email
                var phoneUser = accounts[0].phone
                var usernameUser = accounts[0].username
                res.render('account/uploadAvatar', {  
                    nameCookies,
                    layout: false, 
                    nameUser, emailUser, phoneUser, usernameUser
                });
            })
            .catch(next); 
    } 
    handleUploadFile(req, res, next) { 
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // Display uploaded image for user validation   
        var name = req.cookies.name  
        const urlAvatarUser = `/img/avatar/${req.file.filename}`  
        req.cookies.avatar = urlAvatarUser
        const query = { name }
            Account.update(query,
                          {$set : {"avatar": urlAvatarUser}},
                          {upsert:false,
                          multi:true})  
            .catch(next);  
        // res.send(`You have uploaded this image: <hr/><img src="${urlAvatarUser}" width="300"><hr /><a href="/upload">Upload another image</a>`);  
        res.redirect('/account/login')
    }
} 
module.exports = new AccountController; 