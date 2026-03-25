const routes=require('express').Router()
const userController=require("../api/user/userController")
const musicController=require("../api/music/musicController")

//auth routes
routes.post("/user/register",userController.register)
routes.post("/user/login",userController.login)

//token routes
routes.use(require("../middleware/userTokenchecker"))

//user routes
routes.get("/user/getMusic",musicController.getAllMusic)
routes.get("/user/album",musicController.getAllAlbum)
routes.get("/user/album/:albumId",musicController.getAlbumMusic)



module.exports=routes