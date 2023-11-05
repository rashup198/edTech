const User = require('../models/User');
const Profile = require('../models/Profile');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const dotenv = require('dotenv');

exports.updateProfile = async (req, res) => {

    try {
         
        // data fetch
        const{dateOfBirth="", contactNumber, about=""} = req.body;
        //fetch user id
        const id = req.user._id;
    
        //validation
        if(!contactNumber|| !about || !dateOfBirth){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //find profile
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);
        if(!profile){
            return res.status(404).json({
                success:false,
                message:"Profile not found"
            })
        }
        // Update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;

        // Save the updated profile
        await profile.save();

        //send response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:profile
        })

    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"failed to update profile",
            error:error.message
        })
    }
}

// delete profile

exports.deleteProfile = async (req, res) => {

    try {
        const id= req.user.id;
        //validation
        const user = await User.findById({id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:user.additionalDetails});

        //delete user
        await User.findByIdAndDelete({_id:id});

        //unenroll user from course
        await Course.updateMany({enrolledUsers:id},{$pull:{enrolledUsers:id}});

        //send response
        return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
        
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"failed to delete user",
            error:error.message
        })
    }
}

// get all user details

exports.getAllUserDetails = async (req, res) => {

    try {
        const id= req.user.id;
        //validation
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        //send response
        return res.status(200).json({
            success:true,
            message:"user details fetched successfully",
            data:userDetails
        })

    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"failed to fetch user details",
            error:error.message
        })
    }
}

// update profile picture of user

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


// get enrolled courses of user
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
