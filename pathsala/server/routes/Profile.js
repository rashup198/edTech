const express = require('express');
const router = express.Router();
const {auth}= require("../middelwares/auth");

// Controllers
const{getEnrolledCourses,updateDisplayPicture,getAllUserDetails,deleteProfile,updateProfile} = require('../controllers/Profile');

// Profile routes

// delete profile
router.delete('/deleteProfile',auth,deleteProfile);
// update profile
router.put('/updateProfile',auth,updateProfile);
// get all user details
router.get('/getUserDetails',auth,getAllUserDetails);
// get enrolled courses
router.get('/getEnrolledCourses',auth,getEnrolledCourses);
// update display picture
router.put('/updateDisplayPicture',auth,updateDisplayPicture);

module.exports = router;
