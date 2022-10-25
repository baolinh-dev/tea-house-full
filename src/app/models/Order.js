const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const mongooseDelete = require('mongoose-delete');

const Order = new Schema( 
    {  
        idProduct : { type: String, require: true },
        name: { type: String },
        image: { type: String}, 
        category: { type: String},   
        price: { type: String},
        quantity : { type: Number}, 
        dateOrder: { type: Date, default: Date.now },
    }, 
    {
        timestamps: true,
    },);  

// Add plugins 
Order.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Order' , Order);