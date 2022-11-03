const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const mongooseDelete = require('mongoose-delete');

const Order = new Schema( 
    {  
        name: { type: String},
        phone : { type: String}, 
        email : { type: String},  
        address : { type: String}, 
        sumary : { type: String},
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