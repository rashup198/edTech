 const User = require("../models/User");
 const mailSender = require("../utils/mailSender");
 const bcrypt = require("bcryptjs");
const crypto = require("crypto");


 //reset password token
 exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req.body
        const { email } = req.body;
        
        //check if email exist in db
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `This email ${email} does not exist in our database`
            });
        }

        //generate reset password token
        const token = crypto.randomUUID();
        console.log("token", token);

        //update user by adding token adn token expiry time
        const updateDetails = await User.findOneAndUpdate({ email }, { token:token, resetPasswordExpires: Date.now() + 5*60*1000 }, { new: true });

        console.log("updateDetails", updateDetails);
        //creatte url
        const url = `http://localhost:3000/reset-password/${token}`;

        //send email
        await mailSender({
            email: email,
            subject: "Reset Password",
            message: `Click on the link to reset your password ${url}`
        });

        //send response
        return res.status(200).json({
            success: true,
            message: "Reset password link sent successfully to your email"
        });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
 }

 //reset password

 exports.resetPassword = async (req, res) => {
    try {
        //data fetch
        const { password, confirmPassword, token } = req.body;
        // validate
        if(!password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password does not match"
            });
        }

        //find user by token
        const userDetails = await User.findOne({token:token});
        // if no entry found
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }
        //token is expired
        if(userDetails.resetPasswordExpires< Date.now()){
            return res.status(400).json({
                success: false,
                message: "Token expired"
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update user
        await User.findOneAndUpdate({token:token}, {password:hashedPassword},
        {new:true});
        
        //send response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
 }