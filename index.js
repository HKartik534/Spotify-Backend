require('dotenv').config()
const express=require('express')
const app=express()
const db=require('./src/config/db')
const cookieParser=require('cookie-parser')
const apiroutes=require("./src/routes/apiroutes")
const artistroutes=require("./src/routes/artistroutes")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/apis",apiroutes)
app.use("/api/artist",artistroutes)

//test api
app.get("/",(req,res)=>{
    res.status(200).json({message:"Server is online"})
})

app.listen(3000,(err)=>{
    if(err!=null){
        console.log("Error while connecting server");
    }
    else{
        console.log("Server listening on port:",3000);
        
    }
})