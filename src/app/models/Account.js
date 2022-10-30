const mongoose = require('mongoose');
const Schema = mongoose.Schema;   
const mongooseDelete = require('mongoose-delete');

const Account = new Schema( 
    { 
        name: { type: String, require: true }, 
        avatar: { type: String},
        email: { type: String},
        phone: { type: String}, 
        username: { type: String},  
        password: { type: String},     
        role: { type: String, default: "user"},
    }
);   
// Add Plugins 
Account.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Account' , Account);