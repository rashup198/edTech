const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req, res)=>{
    try {
        //data fetch
        const {sectionName, courseId} = req.body;

        //validation

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //create section in db
        const newSection = await Section.create({sectionName})
        console.log("newSection", newSection);
        //update course
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push:{
                courseContent:newSection._id
            },
            
        },{new:true})  

        //send response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            newSection,
            updateCourseDetails
        })
         
 
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success:false,
            message:"failed to create section",
            error:error.message
        })
    }
}