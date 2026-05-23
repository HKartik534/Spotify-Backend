const userModel = require("./userModel")
const jwt = require('jsonwebtoken')
const key = process.env.JWTKEY
const bcrypt=require('bcrypt')
const salt=10

const register = (req, res) => {
    userModel.findOne({ $or: [{ email: req.body.email }] }) //or operator is used so that we can give multiple checking condition and if any one condition is true it will return the value 
        .then((userdata) => {
            if (userdata != null) {
                res.send({
                    status: 409,
                    success: false,
                    message: "User with this email already exist"
                })
            }
            else {
                let userObj = new userModel()
                userObj.username = req.body.username
                userObj.email = req.body.email
                userObj.password = bcrypt.hashSync(req.body.password,salt)
                userObj.role = req.body.role
                userObj.save()
                    .then(async (userdata) => {
                        const payload = {
                            _id: userdata._id,
                            role: userdata.role
                        }
                        const token = await jwt.sign(payload, key)
                        res.cookie("token", token)
                        res.send({
                            status: 200,
                            success: true,
                            message: "User registered successfully",
                            userdata
                        })
                    })
                    .catch((err) => {
                        res.send({
                            status: 400,
                            success: false,
                            message: "Something wrong with registration of user"
                        })
                    })
            }
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "Something went wrong with findOne"
            })

        })
}

const login=(req,res)=>{
    userModel.findOne({$or:[{email:req.body.email},
        {username:req.body.username}]})// we have given 2 condition in $or operator so user can login with email or username 
        .then((userdata)=>{
            if(userdata==null){
                res.send({
                    status:404,
                    success:false,
                    message:"User do not exist"
                })
            }
            else{
                bcrypt.compare(req.body.password,userdata.password, async function(err,isMatch){
                    if(!isMatch){
                        res.send({
                            status:404,
                            success:false,
                            message:"Invalid password"
                        })
                    }
                    else{
                        const payload={
                            _id:userdata._id,
                            role:userdata.role
                        }
                       const token = await jwt.sign(payload,key)
                       res.cookie("token",token)
                        res.send({
                            status:200,
                            success:true,
                            message:"User login successfully",
                            userdata
                        })
                    }
                })
            }
        })
        .catch((err)=>{
            res.send({
                status:500,
                success:false,
                message:"Something went wrong with findOne"
            })
        })
}

module.exports = { register,login }