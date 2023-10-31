const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// send otp
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

// signup

exports.signUp = async (req, res) => {
    
    try {

        //fetach data from req.body
        const{firstName,lastName,email,password, confirmPassword, accountType, contactNumber, otp} = req.body; 

        //validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if password and confirm password are same
        if(password !==confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password are not same"
            });
        }

        // check if user already exist

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exist"
            });
        }

        // find most recent otp
        const recentOtp = await OTP.findOne({email}).sort({createdAt: -1}).limit(1);
        console.log("recentOtp", recentOtp);

        // check if otp is valid or not
        if(recentOpt.length==0){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        } else if(recentOtp.otp !== otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user in db

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}&background=%23fff&radius=50`,
            contactNumber
        });

        // return res

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });


    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:"User can not be created. Please try again later"
        });
    }

}


//login
    exports.login = async (req, res) => {
        try {
            // fetch data from req.body
             const {email, password} = req.body;

            // validate data
            if(!email || !password){
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // check if user exist in db
            const user = await User.findOne({email}).populate("additionalDetails");
            if(!user){
                return res.status(401).json({
                    success: false,
                    message: "User is not registered with us"
                });
            }

            // generate JWT, after password matching 
            if(await bcrypt.compare(password, user.password)){
                const payload = {
                    email: user.email,
                    id: user._id,
                    role:user.role,

                }
                const token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"2h"
                })
                user.token = token;
                user.password = undefined;

                // create cookie
                const option = {
                    expires: new Date(Date.now()+ 3*24*60*60*1000),
                    httpOnly: true
                }

                res.cookie("token",token, option).status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    user,token
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                success: false,
                message:"User can not be logged in. Please try again later"
            });
        }

    }

    // change password

    exports.changePassword = async (req, res) => {

        try {
            // fetch data from req.body
            const {oldPassword, newPassword, confirmPassword} = req.body;

            // validate data
            if(!oldPassword || !newPassword || !confirmPassword){
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // check if new password and confirm password are same
            if(newPassword !== confirmPassword){
                return res.status(400).json({
                    success: false,
                    message: "New password and confirm password are not same"
                });
            }

            // check if user exist in db
            const user = await User.findById(req.userId);
            if(!user){
                return res.status(401).json({
                    success: false,
                    message: "User is not registered with us"
                });
            }

            // check if old password is correct

            if(await bcrypt.compare(oldPassword, user.password)){
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;
                await user.save();
                return res.status(200).json({
                    success: true,
                    message: "Password changed successfully"
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                success: false,
                message:"Password can not be changed. Please try again later"
            });
        }

    }