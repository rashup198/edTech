const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const User = require('../models/User');


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
