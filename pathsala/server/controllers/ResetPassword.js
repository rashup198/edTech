const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us. Enter a Valid Email.`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    
    await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      }
    );

    const url = `http://localhost:3000/update-password/${token}`;
    
    await mailSender(
      email,
      "Password Reset",
      `Your link for password reset is ${url}. Please click this URL to reset your password.`
    );

    res.json({
      success: true,
      message: "Email Sent Successfully. Please check your email to continue further.",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: `Some error occurred while sending the reset message.`,
      error: error.message,
    });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }

    const userDetails = await User.findOne({ token: token });

    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid.",
      });
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired. Please regenerate your token.`,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword, token: null, resetPasswordExpires: null },
      { new: true }
    );

    res.json({
      success: true,
      message: "Password Reset Successful.",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: `Some error occurred while updating the password.`,
      error: error.message,
    });
  }
};
