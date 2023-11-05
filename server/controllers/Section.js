const Section = require('../models/Section');
const Course = require('../models/Course');
const dotenv = require('dotenv');

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

// updated section

exports.updateSection = async (req, res) => {

    try {
        //data fetch
        const {sectionName,sectionId} = req.body;

        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //update section
        const updateSectionDetails =await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

        //send response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            updateSectionDetails
        })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success:false,
            message:"failed to update section",
            error:error.message
        }) 
    }

}

// delete section

exports.deleteSection = async (req,res)=>{
    try {
        //data fetch
        const {sectionId} = req.params;

        //validation
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //delete section findbyidanddelete

        const deleteSectionDetails = await Section.findByIdAndDelete(sectionId)


        //send response

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            deleteSectionDetails
        })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success:false,
            message:"failed to update section",
            error:error.message
        }) 
    }
}