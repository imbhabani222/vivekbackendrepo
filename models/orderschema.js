const mongoose=require('mongoose')
const {Schema}=mongoose

const orderschema=new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    orderdata:{
        type:Array,
        required:true
    }
})
module.exports=mongoose.model('orders',orderschema)