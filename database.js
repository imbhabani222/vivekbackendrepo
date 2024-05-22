const mongoose=require('mongoose')
const mongodbURI="mongodb+srv://StyleSync:StyleSync8797@cluster0.noajjph.mongodb.net/StyleSyncmern?retryWrites=true&w=majority"


const mongodb=async()=>{
    await mongoose.connect(mongodbURI)
        console.log('db is connected')
    
}
module.exports=mongodb