const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose'); 
const Order = require('../models/Order')  
const Product = require('../models/Product') 
class OrderController { 
    // [POST] cart/:id/add
    addCart(req, res, next) {   
        Product.findById(req.params.id) 
            .then((products) => {
            Order.create({  
                idProduct: products._id,
                name: products.name, 
                image: products.image, 
                category: products.category, 
                price: products.price, 
                quantity: 1,
            })
            .then(() => res.json('Lưu thành công'))
            .catch((error) => {});   
            })
            .catch(next); 
    } 
} 
module.exports = new OrderController;