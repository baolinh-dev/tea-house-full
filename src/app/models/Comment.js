const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Comment = new Schema( 
    { 
        name: { type: String, require: true },
        avatar: { type: String},
        comment: { type: String}, 
    }, 
    {
        timestamps: true,
    },);  

// Add plugins 
mongoose.plugin(slug);
Comment.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Comment' , Comment);