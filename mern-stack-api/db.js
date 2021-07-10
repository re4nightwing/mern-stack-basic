const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect('//connetion URI',{useNewUrlParser: true, useUnifiedTopology:true},
    err => {
        if(!err)
            console.log("DB connected!")
        else
            console.log('Error occured: ', JSON.stringify(err.undefined,2))
    }
)