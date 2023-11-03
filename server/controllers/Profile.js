const User = require('../models/User');
const Profile = require('../models/Profile');

exports.updateProfile = async (req, res) => {

    try {
         
        // data fetch
        const{dateOfBirth="", contactNumber, about="", gender} = req.body;
        //fetch user id
        const userId = req.user._id;
    
        //validation
        if(!contactNumber || !gender || !id|| !about || !dateOfBirth){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //find profile
        const userDetails = await User.findById({id});
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById({profileId});

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.about = about;
        profileDetails.gender= gender;
        await profileDetails.save();

        //send response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:profileDetails
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