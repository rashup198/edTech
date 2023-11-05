const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const {passwordUpdated} =require("../mail/templates/passwordUpdate")
const Profile = require('../models/Profile');
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

    await mailSender(
        email,
        "OTP Verification",
        `Your OTP for email verification is ${otp}. Please enter this otp to verify your email.`
    );
    

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
        if(recentOtp.length==0){
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
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email }).populate("additionalDetails");

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};

    // change password

    exports.changePassword = async (req, res) => {
        try {
            // Get user data from req.user
            const userDetails = await User.findById(req.user.id);
    
            // Get old password, new password, and confirm new password from req.body
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
    
            // Validate old password
            const isPasswordMatch = await bcrypt.compare(
                oldPassword,
                userDetails.password
            );
            if (!isPasswordMatch) {
                // If old password does not match, return a 401 (Unauthorized) error
                return res
                    .status(401)
                    .json({ success: false, message: "The password is incorrect" });
            }
    
            // Match new password and confirm new password
            if (newPassword !== confirmNewPassword) {
                // If new password and confirm new password do not match, return a 400 (Bad Request) error
                return res.status(400).json({
                    success: false,
                    message: "The password and confirm password does not match",
                });
            }
    
            // Update password
            const encryptedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUserDetails = await User.findByIdAndUpdate(
                req.user.id,
                { password: encryptedPassword },
                { new: true }
            );
    
            // Send notification email
            try {
                const emailResponse = await mailSender(
                    updatedUserDetails.email,
                    passwordUpdated(
                        updatedUserDetails.email,
                        `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                    )
                );
                console.log("Email sent successfully:", emailResponse.response);
            } catch (error) {
                // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
                console.error("Error occurred while sending email:", error);
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                    error: error.message,
                });
            }
    
            // Return success response
            return res
                .status(200)
                .json({ success: true, message: "Password updated successfully" });
        } catch (error) {
            // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while updating password:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while updating password",
                error: error.message,
            });
        }
    };
