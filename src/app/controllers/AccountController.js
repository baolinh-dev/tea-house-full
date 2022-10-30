const Account = require('../models/Account')    
const Product = require('../models/Product') 
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose'); 
const jwt = require('jsonwebtoken');  
const { json } = require('express'); 

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
        var name = req.cookies.name
        res.render('account/login', {   
            layout: false,
            name,
        })
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
                      if(accounts.role === 'user') { 
                            res.redirect('/')
                      } else if (accounts.role === 'admin') { 
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
} 
module.exports = new AccountController; 