const Course = require('../models/Course');
const Category = require('../models/category');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');


//create course

exports.createCourse = async (req, res) => {

    try {
        
        //extract data from req.body
        const{courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,}= req.body;

        //get thumbnail 
        const thumbnail = req.file.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !price || !tag || !whatYouWillLearn || !thumbnail || !category){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(!status || status === undefined){
            status = "Draft";
        }

        //check for instructor
        const userId = req.user._id;
        const instructorDetails = await User.findById(userId,{
            accountType:"Instructor"
        });
        console.log("instructorDetails", instructorDetails);
        if(!instructorDetails){
            return res.status(400).json({
                success: false,
                message: "Instructor not found"
            })
        }

        //check for tag
        const categoryDetails = await Category.findById(category);
        console.log("categoryDetails", categoryDetails);
        if(!categoryDetails){
            return res.status(400).json({
                success: false,
                message: "Category not found"
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

        await Category.findByIdAndUpdate
        ({_id:category},
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
        const {courseId} = req.params.id;

        //find course details
        const courseDetails = await Course.find({_id:courseId}).populate(
            {path:"instructor",
             populate:{path:"additionalDetails"}}).populate(
                    {path:"tag"}).populate(
                        {path:"rantingAndReviews",
                        populate:{path:"user"}}).populate(
                            {path:"studentsEnrolled",
                            populate:{path:"additionalDetails"}}).populate(
                                {path:"courseContent"
                            ,populate:{path:"sectionContent"}}).populate(
                                "Category").exec();


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