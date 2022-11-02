const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose'); 
const Order = require('../models/Order')  
const Product = require('../models/Product')  
class OrderController {  
    cartList(req, res, next) { 
        res.json(req.session.cart)
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
                Product.find({ category: 'Tra-hoa-qua' }).exec() 
                        .then((products) => {   
                            res.render('menu', {  
                                name,  
                                avatar, 
                                quantityCart,   
                                products: mutipleMongooseToObject(products),
                            })
                        }) 
                        console.log(req.session.cart)
            })  
            .catch(next)
    }  
     
    
    
} 
module.exports = new OrderController;