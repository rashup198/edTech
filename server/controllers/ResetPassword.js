 const User = require("../models/User");
 const mailSender = require("../utils/mailSender");

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
                message: "User not found"
            });
        }

        //generate reset password token
        const token = crypto.randomUUID();
        console.log("token", token);

        //update user by adding token adn token expiry time
        const updateDetails = await User.findOneAndUpdate({ email }, { token:token, resetPasswordExpires: Date.now() + 5*60*1000 }, { new: true });

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