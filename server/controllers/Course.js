const Course = require('../models/Course');
const Tag = require('../models/Tag');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');


//create course

exports.createCourse = async (req, res) => {

    try {
        
        //extract data from req.body
        const{courseName, courseDescription, price, tag, whatYouWillLearn}= req.body;

        //get thumbnail 
        const thumbnail = req.file.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !price || !tag || !whatYouWillLearn || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //check for instructor
        const userId = req.user._id;
        const instructorDetails = await User.findById(userId);
        console.log("instructorDetails", instructorDetails);
        if(!instructorDetails){
            return res.status(400).json({
                success: false,
                message: "Instructor not found"
            })
        }

        //check for tag
        const tagDetails = await Tag.findById(tag);
        console.log("tagDetails", tagDetails);
        if(!tagDetails){
            return res.status(400).json({
                success: false,
                message: "Tag not found"
            })
        }

        //upload thumbnail to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.Folder_Name);

        //create course enty in db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            price,
            tag:tagDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            thumbnail:thumbnailImage.secure_url
        });

        // user course array update

        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {$push:{courses:newCourse._id}},
            {new:true},
            )  
            
        // updated tag course array

        await Tag.findByIdAndUpdate
        ({_id:tagDetails._id},
            {$push:{courses:newCourse._id}},
            {new:true},)

            //send response

            return res.status(200).json({
                success: true,
                message: "Course created successfully",
                newCourse
            });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:"failed to create course",
            error:error.message
        });
    }

}

