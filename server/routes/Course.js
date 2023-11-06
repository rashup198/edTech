const express = require('express');
const router = express.Router();

// Controllers

// course controllers
const { createCourse, getAllCourses,getCourseDetails } = require('../controllers/Course');

// catrgory controllers
const { createCategory, showAllCategories,categoryPageDetails } = require('../controllers/Category');

// Section controllers

const { createSection,deleteSection,updateSection } = require('../controllers/Section');

// subsection controllers

const { createSubSection,deleteSubSection,updateSubSection } = require('../controllers/Subsection');

// Rating controllers

const { createRating,getAverageRating,getAllRatingAndReviewOnPlatform,getAllRatingAndReview } = require('../controllers/RatingAndReview');


// middelwares

const {auth, isInstructor,isAdmin,isStudent} = require('../middelwares/auth');

// Course routes


router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)


// Category routes {for admin only}

//create category
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// Rating routes

//create rating
router.post('/createRating',auth,isStudent,createRating);
//get average rating
router.post('/getAverageRating',auth,getAverageRating);
//get all rating and review on platform
router.get('/getAllRatingAndReviewOnPlatform',auth,getAllRatingAndReviewOnPlatform);
//get all rating and review on a course
router.post('/getAllRatingAndReview',auth,getAllRatingAndReview);


module.exports = router;
