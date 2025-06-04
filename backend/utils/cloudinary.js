const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloud = async (localFilePath)=>{
    try {
        if(!localFilePath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });

        console.log("File uploaded successfully to cloudinary : ",response.url);
        return response;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath);
        return null;
    }

}

module.exports = { uploadOnCloud };