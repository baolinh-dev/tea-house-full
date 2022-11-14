const { response } = require('express');
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose'); 
const Account = require('../models/Account');
const Order = require('../models/Order')  
const Product = require('../models/Product');  
const { account } = require('./AdminController');
class OrderController {  
    cartList(req, res, next) {   
        var carts = req.session.cart 
        var name = req.cookies.name   
        var avatar = req.cookies.avatar   
        var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            }  
        Account.findOne({"name" : name}) 
            .then((accounts) => {   
                res.render('cart/cart', {  
                    name, avatar, quantityCart,  
                    carts, 
                    accounts: mongooseToObject(accounts)
                })   
            }) 
    }
    // [POST] cart/:slug
    addCart(req, res, next) {   
        var slug = req.params.slug 
        Product.findOne({slug : slug}) 
            .then((products) => { 
                if(typeof req.session.cart == "undefined") { 
                    req.session.cart = []; 
                    req.session.cart.push({ 
                        title: slug, 
                        quantity: 1, 
                        name: products.name, 
                        price: products.price, 
                        image: products.image, 
                    })
                } else { 
                    var cart = req.session.cart; 
                    var newItem = true; 

                    for(var i = 0; i < cart.length; i++) { 
                        if(cart[i].title == slug) { 
                            cart[i].quantity++; 
                            newItem = false; 
                            break;
                        }
                    } 
                    if(newItem) { 
                        cart.push({ 
                            title: slug, 
                            quantity: 1, 
                            name: products.name, 
                            price: products.price, 
                            image: products.image, 
                        })
                    }
                }     
                var name = req.cookies.name   
                var avatar = req.cookies.avatar
                var quantityCart = req.session.cart.length 
                Product.find({ category: 'Trà hoa quả' }).exec() 
                        .then((products) => {   
                            res.render('menu', {  
                                name,  
                                avatar, 
                                quantityCart,   
                                products: mutipleMongooseToObject(products),
                            })
                        }) 
            })  
            .catch(next)
    }   
    // [POST] /cart/list
    saveCartList(req, res, next) {  
        var d = new Date(); 
        var month = d.getMonth() + 1; 
        var day = d.getDate()  
        var estimatedDay = d.getDate() + 5;
        var year = d.getFullYear()   

        var name = req.body.name
        var phone = req.body.phone
        var email = req.body.email
        var address = req.body.address
        var sumary = req.body.sumary   

        var dateOrder = `${day}-${month}-${year}`   
        var dateEstimatedOrder = `${estimatedDay}-${month}-${year}`   

        Order.create({name, phone, email, address, sumary, dateOrder, dateEstimatedOrder}) 
            .then((data) => { 
                    req.session.orderId = data._id 
                    res.redirect('/cart/detail')
            })
    }
    cartDetail(req, res, next) {   
        var name = req.cookies.name   
        var avatar = req.cookies.avatar   
        var carts = req.session.cart
        var checkOrder = false 
        if(req.session.orderId) { 
            checkOrder = true
        }
        var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            } 
        Order.findById(req.session.orderId) 
        .then((orders) => {  
            res.render('cart/cartDetail', {     
                name, avatar, quantityCart, checkOrder, carts, 
                orders: mongooseToObject(orders)
            }) 
        })
    }
} 
module.exports = new OrderController;