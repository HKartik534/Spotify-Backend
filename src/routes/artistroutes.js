const routes=require('express').Router()
const musicController=require("../api/music/musicController")
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})



//token routes
routes.use(require("../middleware/artistTokenchecker"))

//music routes
routes.post("/create",upload.single("musicFile"),musicController.add)

//album routes 
routes.post("/create/album",musicController.addAlbum)



module.exports=routes