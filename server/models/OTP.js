const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

// function to generate OTP
async function sendVerficationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "OTP for Pathsala", otp);
    } catch (error) {
        console.log("Error in sending verification email", error);
        throw new Error(error); 
    }
}

OTPSchema.pre('save', async function(next){
    await sendVerficationEmail(this.email, this.otp);   
    next();
})

module.exports = mongoose.model('OTP', OTPSchema);
