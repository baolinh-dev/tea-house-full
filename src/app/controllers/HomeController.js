const Product = require('../models/Product') 
const { mutipleMongooseToObject } = require('../../util/mogoose') 
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken') 
const Account = require('../models/Account')
class HomeController { 
    // [GET] /
    index(req, res, next) { 
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')    
            var name = req.cookies.name   
            var avatar = req.cookies.avatar  
            if(ketqua) {                 
                Account.findById(ketqua._id) 
                    .then((accounts) => {
                        if(accounts.role == 'user' || accounts.role == 'admin') { 
                            Product.find({ category: 'Tra-hoa-qua' }) 
                                .limit(8)
                                .then((products) => {
                                    res.render('home', {   
                                        avatar, 
                                        name,
                                        products: mutipleMongooseToObject(products),
                                    });
                                })
                            .catch(next);
                        } else { 
                            res.json('Ban khong co quyen vao trang mua hang')  
                        }
                    }) 
            }
        } catch (error) {
            res.redirect('/account/login')
        }
    } 
    // [GET] /ca-phe
    caphe(req, res, next) { 
        var name = req.cookies.name  
        var avatar = req.cookies.avatar  
        Product.find({ category: 'Ca-phe' }) 
            .limit(4)
            .then((products) => {
                res.render('home', {  
                    avatar, 
                    name,
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    } 
    // [GET] /smoothies
    smoothies(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        Product.find({ category: 'Smoothies' }) 
            .limit(4)
            .then((products) => {
                res.render('home', {  
                    avatar, 
                    name,
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    } 
    // [GET] /banh-ngot
    banhngot(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        Product.find({ category: 'Banh-ngot' }) 
            .limit(4)
            .then((products) => {
                res.render('home', {  
                    avatar, 
                    name,
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    } 
} 
module.exports = new HomeController;