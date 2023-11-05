const express = require('express');
const router = express.Router();

// Controllers
const {signUp,changePassword,login,sendOTP} = require('../controllers/Auth');

// reset password controllers

const {resetPassword,resetPasswordToken}= require('../controllers/ResetPassword');

const {auth, isInstrutor,isAdmin,isStudent} = require('../middlewares/auth');

//routes for login and signup and authentication

// user login
router.post('/login',login);
// user signup
router.post('/signup',signUp);
//sending otp to email
router.post('/sendOTP',sendOTP);
//change password
router.post('/changepassword',changePassword);


//reset password
//reset password token
router.post('/resetPasswordToken',resetPasswordToken);
//reset password after verifying token
router.post('/resetPassword',resetPassword);

module.exports = router;

