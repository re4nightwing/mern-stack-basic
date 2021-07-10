const mongoose = require('mongoose')

var BlogPost = mongoose.model('BlogPost',
{
    title: {type: String},
    message: {type: String},
},'blogPosts')

module.exports = {BlogPost}