const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Feedback = new Schema( 
    { 
        fullname: { type: String, require: true },
        email: { type: String},
        phone: { type: String}, 
        content: { type: String},  
    }, 
    {
        timestamps: true,
    },);  

// Add plugins 
mongoose.plugin(slug);
Feedback.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Feedback' , Feedback);