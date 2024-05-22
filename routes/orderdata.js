const express=require('express')
const order = require('../models/orderschema')
const router=express.Router()



router.post('/orderdata',async(req,res)=>{
    let data=req.body.orderdata
    const emailuser=req.body.email
    let Email=await order.findOne({email:emailuser})
    if(Email==null){
        try {
        await order.create({
            email:emailuser,
            orderdata:[data]
        })
        return res.json({success:true})
    } catch (error) {
        console.error(error.message)
        return res.json({success:false})
    }
    }
    else{
        try {
            await order.findOneAndUpdate({email:emailuser},
            {$push:{orderdata:data}})
           return res.json({success:true})
        } catch (error) {
            console.error(error.message)
        }
    }
    
    
})
module.exports=router