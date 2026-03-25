const mongoose=require('mongoose')

const musicSchema= new mongoose.Schema({
    musicFile:{type:String,required:true},//imagekit ki url musicFile
    title:{type:String,required:true},
    artist:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
},{timestamps:true})

module.exports=new mongoose.model("musics",musicSchema)