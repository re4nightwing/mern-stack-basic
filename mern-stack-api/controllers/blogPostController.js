const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var {BlogPost} = require('../models/blogPost')

router.get('/',(req,res)=>{
    BlogPost.find((err,docs)=>{
        if(!err) res.send(docs)
        else console.log('error while retreving records: ',JSON.stringify(err,undefined,2))
    })
})
router.post('/',(req,res)=>{
    var newRecord = new BlogPost({
        title: req.body.title,
        message: req.body.message
    })

    newRecord.save((err,docs)=>{
        if(!err) res.send(docs)
        else console.log('error while creating new record: ',JSON.stringify(err,undefined,2))
    })
})
router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('no records on id: ',req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message
    }

    BlogPost.findByIdAndUpdate(req.params.id,{$set: updatedRecord}, {new:true},(err,docs)=>{
        if(!err) res.send(docs)
        else console.log('error while updating record: ',JSON.stringify(err,undefined,2))
    })
})
router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('no records on id: ',req.params.id)

    BlogPost.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err) res.send(docs)
        else console.log('error while updating record: ',JSON.stringify(err,undefined,2))
    })
})


module.exports = router