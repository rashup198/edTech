const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const User = require('../models/User');
const {mongo , default:mongoose} = require('mongoose');


//create rating 

exports.createRating = async (req, res) => {
    try {
        //extract user from req.body
       const userId = req.user.id;

       //extract daTA from req.body
         const {rating, review, courseId} = req.body;

        // check if user is enrolled or not
        const courseDetails = await Course.findOne({_id:courseId, studentsEnrolled:userId});

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"User not enrolled"
            })
        }

        // check if user already rated or not

        const alreadyReviewed = await RatingAndReview.findOne({user:userId, course:courseId});

        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"User already reviewed"
            })
        }

        // create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user:userId,
            course:courseId
        });

        // update course rating and review
       const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                rantingAndReviews:ratingReview._id
            }
        },{new:true});

        // send response
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            ratingReview
        })

    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"Failed to create rating and review",
            error:error.message
        })
    }
}

// get average rating of a course

exports.getAverageRating = async (req, res) => {

    try {

    // get course id
    const courseId = req.body.courseid;

    // calculate average rating
    const result = await RatingAndReview.aggregate([
        {
            $match:{
                course:new mongoose.Types.ObjectId(courseId),
            },
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"},
            }
        }
    ])

    //validate result
    if(result.length> 0){
        return res.status(200).json({
            success:true,
            message:"Average rating fetched successfully",
            averageRating:result[0].averageRating
        })

    }
    // if no rating found
    return res.status(200).json({
        success:true,
        message:"No rating found",
        averageRating:0
    })


    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get all rating and review of a course

exports.getAllRatingAndReview = async (req, res) => {

    try {

        // get course id
        const courseId = req.body.courseid;

        // get all rating and review
        const result = await RatingAndReview.find({course:courseId}).sort({rating:("desc")}).populate("user").exec();

        // validate result
        if(result.length>0){
            return res.status(200).json({
                success:true,
                message:"Rating and review fetched successfully",
                result
            })
        }

        // if no rating and review found
        return res.status(200).json({
            success:true,
            message:"No rating and review found",
            result:[]
        })



    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"Failed to get rating and review",
        })
    }

}

// get all rating and review on the platform


exports.getAllRatingAndReviewOnPlatform = async (req, res) => {

    try {
        const allReviews = await RatingAndReview.find({}).populate({
            path:"user",
            select:"firstName lastName email image"
        }).populate({
            path:"course",
            select:"courseName"
        }).exec();

        // send response

        return res.status(200).json({
            success:true,
            message:"All rating and review fetched successfully",
            allReviews
        })

        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"Failed to get rating and review",
        })
    }

}