const Course = require('../models/Course');
const Category = require('../models/category');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const dotenv = require('dotenv');


//create course

exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
        // Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
            accountType:"Instructor"})

        console.log("instructorDetails", instructorDetails);
        if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);
		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

// get all courses

exports.getAllCourses = async (req, res) => {

    try {
        const allCourses = await Course.find({},{courseName:true, courseDescription:true, price:true, whatYouWillLearn:true, thumbnail:true, rantingAndReviews:true, instructor:true, tag:true, studentsEnrolled:true}).populate("instructor").exec();

        //send response

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            allCourses
        });
        
    } catch (error) {
       console.log("error", error); 
       return res.status(500).json({
           success: false,
           message:"failed to get courses",
           error:error.message
       });
    }

}

// get course details

exports.getCourseDetails = async (req, res) => {

    try {
        const {courseId} = req.body;

        //find course details
        const courseDetails = await Course.find({_id:courseId}).populate(
            {path:"instructor",
             populate:{path:"additionalDetails"}}).populate(
                        {path:"rantingAndReviews",
                        populate:{path:"user"}}).populate("courseContent").populate("category").exec();
                                // validate course details

                if(!courseDetails){
                return res.status(400).json({
                success: false,
                message: "Course not found"
                })
                }

                //send response

                return res.status(200).json({
                    success: true,
                    message: "Course details fetched successfully",
                    courseDetails
                });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message:"failed to get course details",
            error:error.message
        });
    }

}