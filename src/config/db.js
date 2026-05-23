const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODBURL)
.then(()=>{
     console.log("Database connected successfully");
     
    
})
.catch((err)=>{
    console.log("Error while connecting database");
    
})
