const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/NodeJsProject-2")
.then(()=>{
    console.log("Database connected successfully");
    
})
.catch((err)=>{
    console.log("Error while connecting database");
    
})
