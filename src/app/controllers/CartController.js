const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose'); 
const Order = require('../models/Order')  
const Product = require('../models/Product')  
class OrderController { 
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
                        if(cart[i].title = slug) { 
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
                console.log(req.session.cart)
            })  
            .catch(next)
    } 
} 
module.exports = new OrderController;