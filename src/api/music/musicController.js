const musicModel = require("./musicModel")
const uploadFile = require("../../utilities/helper")
const albumModel = require("./albumModel")

const add = async (req, res) => {
    const uploadFileImagekit = await uploadFile(req.file.buffer)
    let musicObj = new musicModel()
    musicObj.musicFile = uploadFileImagekit.url
    musicObj.title = req.body.title
    musicObj.artist = req.body.artist
    musicObj.save()
        .then((musicdata) => {
            res.send({
                status: 200,
                success: true,
                message: "Music uploaded",
                musicdata

            })
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "Something wrong with save"
            })
        })
}

const addAlbum = (req, res) => {
    const albumObj = new albumModel()
    albumObj.title = req.body.title
    albumObj.music = req.body.music
    albumObj.artist = req.body.artist
    albumObj.save()
        .then((albumdata) => {
            res.send({
                status: 200,
                success: true,
                message: "Album created successfully",
                albumdata
            })
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "Something wrong with save"
            })
        })
}

const getAllMusic = (req, res) => {
    musicModel.find()
        .populate("artist", "username email") //artist ka sirf username and email
        .then((musicdata) => {
            res.send({
                status: 200,
                success: true,
                message: "Muisc data fetched successfully",
                musicdata
            })
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "Something wrong with find"
            })

        })
}

const getAllAlbum = (req, res) => {
    albumModel.find()
        .select("title artist")// only title of album and artist of albums will be shown not the music in albums
        .then((albumdata) => {
            res.send({
                status: 200,
                success: true,
                message: "Album data fetched successfully",
                albumdata
            })
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "Something went wrong with find"
            })
        })
}

const getAlbumMusic = (req, res) => {
    var errMsg = []
    if (!req.body.pageno) {
        errMsg.push("Page no is required")
    }
    if (!req.body.limit) {
        errMsg.push("Limit no is required")
    }
    if (errMsg.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsg
        })
    }
    else {
        //logic for pagination
        var pageno = req.body.pageno
        var limit = req.body.limit
        var skip = 0
        if (pageno > 1) {
            skip = (pageno - 1) * limit
        }

        const albumId = req.params.albumId
        albumModel.findOne({ _id: albumId })
            .populate("music")
            .limit(limit)
            .skip(skip)
            .then((albumdata) => {
                return res.send({
                    status: 200,
                    success: true,
                    message: "Album data fetched successfully",
                    albumdata
                })
            })
            .catch((err) => {
                res.send({
                    status: 500,
                    success: false,
                    message: "Something wrong with find"
                })
            })

    }
}

module.exports = { add, addAlbum, getAllMusic, getAllAlbum, getAlbumMusic }

