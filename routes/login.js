const express=require('express')
const router=express.Router()
const {body,validationResult}=require('express-validator')
const user=require('../models/userschema.js')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtsecret="puBKVN3j4PV8OEsOsvXbMEKDCtG0ALIG"



const validationlogin=[
    body('email').trim().isEmail().withMessage('enter valid email')
]
router.post('/loginuser',validationlogin,async(req,res)=>{
    const errors=validationResult(req)
        if(!errors.isEmpty()){
           return res.json({success:false,errors:errors.array()})
        }
        const email=req.body.email
    try {
        const loginuser=await user.findOne({email})
        if(!loginuser){
           return res.json({errors:'user not found'})
        }
        const pwdcompare=await bcrypt.compare(req.body.password,loginuser.password)
        if(!pwdcompare){
            return res.json({errors:'enter valid password'})
        }
        const data={
            user:{
                id:loginuser.id
            }
        }
        const authtoken=await jwt.sign(data,jwtsecret)
        return res.json({success:true,authtoken:authtoken})
    } catch (error) {
        console.error(error.message)
        res.json({success:false})
    }
})
module.exports=router