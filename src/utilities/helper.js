const {ImageKit}=require('@imagekit/nodejs')

const ImageKitClient= new ImageKit({
    privateKey:"private_2LYutuWFU9nv5IX5DU81A1qn2xQ="
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