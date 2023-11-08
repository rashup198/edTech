const { default: mongoose } = require('mongoose');
const {insatance} = require('../config/razorpay');  
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail}= require('../mail/templates/courseEnrollmentEmail');
const dotenv = require('dotenv');

//capture payment and inisiating razorpay order

exports.capturePayment = async (req, res) => {

    try {
        // data fetch courseid and userid
        const {course_id} = req.body;
        const userId = req.user._id;
        //validation

        if(!course_id){
            return res.status(400).json({
                success:false,
                message:"Course id is required"
            })
        }
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User id is required"
            })
        }

        // validate coursedeatils
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course){
                return res.status(404).json({
                    success:false,
                    message:"Course not found"
                })
            }
        } catch (error) {
            console.log("error",error);
            return res.status(500).json({
                success:false,
                message:"Failed to fetch course",
                error:error.message
            })
        }

        // user already enrolled or not
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.enrolledUsers.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"User already enrolled"
            })
        }
         
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"Failed to capture payment",
            error:error.message
        })
    }

    // create order

    const amount = Course.price;
    const currency = "INR";
    
    const options = {
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:Course._id,
            userId:User._id 
        }
    }

    try {
        //initiate payment
        const paymentResponse = await insatance.orders.create(options); 
        console.log("paymentResponse",paymentResponse); 
        
        //send response
        return res.status(200).json({
            success:true,
            message:"Payment initiated successfully",
            courseName:Course.courseName,
            courseDescription:Course.description,
            thumbnail:Course.thumbnail,
            amount:paymentResponse.amount,
            orderId:paymentResponse.id,
        })
        
    } catch (error) {
       console.log("error",error); 
         return res.status(500).json({
              success:false,
              message:"Failed to initiate payment",
              error:error.message
         })
    }
}

//verify signature of razorpay and server

exports.verifySignature = async (req, res) => {

    const webhookSecret = "123456789";
    const signature = req.headers['x-razorpay-signature'];
    const shasum = crypto.createHmac('sha256', webhookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex');

    if (digest == signature)
        {
            console.log("request is legit");

            //fetch courseid and userid
            const {courseId, userId} = req.body.payload.payment.entity.notes;

            try {
                // action

                //find the course and update enrolled users
                const enrolledCourse = await Course.findById({_id:courseId},
                    {$push:{studentEnrolled:userId}},
                    {new:true});

                    if(!enrolledCourse){
                        return res.status(404).json({
                            success:false,
                            message:"Course not found"
                        })
                    }

                    console.log("enrolledCourse",enrolledCourse);

                    //find the user and update enrolled courses
                    const enrolledStudent = await User.findOneAndUpdate({_id:userId},{$push:{enrolledCourses:courseId}},{new:true});

                    if(!enrolledStudent){
                        return res.status(404).json({
                            success:false,
                            message:"User not found"
                        })
                    }
        
                    //mail send to user about conformatin of enrollment
                    const emailResponse = await mailSender({
                        to:enrolledStudent.email,
                        subject:"Congratulation, on your Course enrollment",
                        text:courseEnrollmentEmail(enrolledStudent.name,enrolledCourse.courseName)
                    });

                    console.log("emailResponse",emailResponse);

                    //send response
                    return res.status(200).json({
                        success:true,
                        message:"Payment successfull course enrolled successfully",
                        data:enrolledCourse
                    })

            } catch (error) {
                console.log("error",error);
                return res.status(500).json({
                    success:false,
                    message:"Failed to enroll course",
                    error:error.message
                })
            }
        }
        else{
            console.log("request is not legit");
            return res.status(400).json({
                success:false,
                message:"Payment failed"
            })
        }
}