const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect('mongodb+srv://dulan:good@cluster0.k7gxi.mongodb.net/blogDB?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology:true},
    err => {
        if(!err)
            console.log("DB connected!")
        else
            console.log('Error occured: ', JSON.stringify(err.undefined,2))
    }
)