const jwt=require('jsonwebtoken')
const key=process.env.JWTKEY

module.exports=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        res.send({
            status:403,
            success:false,
            message:"Token not found"
        })
    }
    else{
        jwt.verify(token,key,function(err,data){
            if(err!=null){
                res.send({
                    status:403,
                    success:false,
                    message:"Token do not match"
                })
            }
            else{
                if(data.role=="artist"){
                    next()
                }
                else{
                    res.send({
                        status:403,
                        success:false,
                        message:"Not an artist"
                    })
                }
            }
        })
    }
}