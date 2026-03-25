const mongoose=require('mongoose')

const albumSchema=new mongoose.Schema({
    title:{type:String,required:true},
    music:[{type:mongoose.Schema.Types.ObjectId,ref:"musics",required:true}],
    artist:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
},{timestamps:true})

module.exports=new mongoose.model("albums",albumSchema)