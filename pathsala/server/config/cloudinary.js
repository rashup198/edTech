const cludinary = require('cloudinary').v2;
const dotenv = require('dotenv');

exports.cloudinaryConnect = () => {

    try {
        cludinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });
    } catch (error) {
        console.log("error", error);
    }
}