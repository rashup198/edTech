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

const { createSubSection,deleteSubSection,updateSubSection } = require('../controllers/SubSection');

// Rating controllers

const { createRating,getAverageRating,getAllRatingAndReviewOnPlatform,getAllRatingAndReview } = require('../controllers/Rating');


// middelwares

const {auth, isInstrutor,isAdmin,isStudent} = require('../middlewares/auth');

// Course routes


// Courses can Only be Created by Instructors
router.post('/create-course',auth,isInstrutor,createCourse);

//add a section to a course
router.post('/addSection',auth,isInstrutor,createSection);

//update a section
router.post('/updateSection',auth,isInstrutor,updateSection);

//delete a section
router.post('/deleteSection',auth,isInstrutor,deleteSection);

//edit subsection
router.post('/updateSubSection',auth,isInstrutor,updateSubSection);

//delete subsection
router.post('/deleteSubSection',auth,isInstrutor,deleteSubSection);

//add subsection
router.post('/addSubSection',auth,isInstrutor,createSubSection);

//get all registered courses
router.get('/getAllCourses',auth,getAllCourses);

//get details of a specific course
router.post('/getCourseDetails',auth,getCourseDetails);


// Category routes {for admin only}

//create category
router.post('/createCategory',auth,isAdmin,createCategory);
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
