const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const mongooseDelete = require('mongoose-delete');
process.env.TZ = "Asia/Ho_Chi_Minh";
const Order = new Schema( 
    {  
        name: { type: String},
        phone : { type: String}, 
        email : { type: String},  
        address : { type: String}, 
        sumary : { type: String}, 
        dateOrder: { type: String}, 
        dateEstimatedOrder: { type: String}, 
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