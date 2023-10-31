const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');

exports.sendOTP = async (req, res) => {

    try {

    //fetach email from req.body
    const { email } = req.body;

    //check if email exist in db
    const checkUserPresent= await User.findOne({ email });

    //if user exist then send response
    if(checkUserPresent){
        return res.status(400).json({
            success: false,
            message: "Email already exist try with another email"
        });
    }

    // generate otp
    var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    console.log("your otp is", otp);

    //check if otp already exist in db
    let result = await OTP.findOne({ otp: otp });

    while(result){
        otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = {otp,email}

    //save otp in db
    const otpBody = await OTP.create(otpPayload);
    console.log("otpBody", otpBody);

    res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otp
    });


    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:error.message
        });
    }

    

}