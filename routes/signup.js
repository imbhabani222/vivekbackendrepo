const express=require('express')
const user = require('../models/userschema')
const router=express.Router()
const {body,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs')

const validationsignup=[
    body('name').trim().notEmpty().withMessage('enter valid username'),
    body('email').trim().isEmail().withMessage('enter valid email'),
    body('password').trim().isLength({min:6}).withMessage('enter valid password')
]
router.post('/signup',validationsignup,async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.send({success:false,errors:errors.array()})
    }
    const salt=await bcrypt.genSalt(10)
    const secpassword=await bcrypt.hash(req.body.password,salt)
   try {
    await user.create({
        name: req.body.name,
        email:req.body.email,
        password:secpassword
    })
    res.send({success:true})
   } catch (error) {
    console.error(error.message)
   }
})
module.exports=router