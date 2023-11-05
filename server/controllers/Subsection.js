const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// create subsection

exports.createSubSection = async (req, res) => {

    try {
        //data fetch
        const {titel, description, sectionId} = req.body;
        const video = req.file.videoFile;        

        //validation

        if(!titel || !description || !sectionId || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //upload video to cloudinary

        const uploadDetails = await uploadImageToCloudinary(video,process.env.Folder_Name)

        //create subsection
        const subSectionDetails = await SubSection.create({
            titel:titel,
            timeDuration:timeDuration,
            description:description,
            video:uploadDetails.secutr_url
        })

        //update section
        const section = await Section.findById({_id:sectionId},
            {$push:{subsection:subSectionDetails._id}});

        //send response
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            data:subSectionDetails
        })

    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"failed to create subsection",
            error:error.message
        })
    }

}

// update subsection

exports.updateSubSection = async (req, res) => {

    try {
        //fetch data
        const {titel, timeDuration, description, sectionId} = req.body;
        const video = req.file.videoFile;
        const subSectionId = req.params.id;

        //validation
        if(!titel || !timeDuration || !description || !sectionId || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //delete old video from cloudinary
        const subSection = await SubSection.findById(subSectionId);
        await deleteImageFromCloudinary(subSection.video);

        // upload video to cloudinary

        const uploadDetails = await uploadImageToCloudinary(video,process.env.Folder_Name)

        //update subsection
        const updateSubSectionDetails = await SubSection.findByIdAndUpdate(subSectionId,{
            titel:titel,
            timeDuration:timeDuration,
            description:description,
            video:uploadDetails.secure_url
        },{new:true})

        //send response
        return res.status(200).json({
            success:true,
            message:"Subsection updated successfully",
            updateSubSectionDetails
        })
        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"failed to create subsection",
            error:error.message
        })
    }

}

// delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        //fetch data
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      //send response
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }