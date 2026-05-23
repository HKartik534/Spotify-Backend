const {ImageKit}=require('@imagekit/nodejs')

const ImageKitClient= new ImageKit({
    privateKey:process.env.PRIVATEKEY
})

async function uploadFile(file) {
    const result= await ImageKitClient.files.upload({
        file:file.toString("base64"),
        fileName:"music_"+Date.now(),
        folder:"NodeJsProject-2/music"
    })

    return result
}

module.exports=uploadFile