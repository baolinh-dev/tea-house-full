const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;  

const Product = new Schema( 
    { 
        name: { type: String, require: true },
        price: { type: String},
        image: { type: String}, 
        category: { type: String},  
        slug: { type: String, slug: 'name', unique: true },   
    }, 
    {
        timestamps: true,
    },);  

// Add plugins 
mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Product' , Product);