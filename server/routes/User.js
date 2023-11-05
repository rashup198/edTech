const express = require('express');
const router = express.Router();

// Controllers
const {signUp,changePassword,login,sendOTP} = require('../controllers/Auth');

// reset password controllers

const {resetPassword,resetPasswordToken}= require('../controllers/ResetPassword');

const {auth, isInstrutor,isAdmin,isStudent} = require('../middlewares/auth');

