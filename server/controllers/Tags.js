const Tag = require('../models/tags');

//create tag

exports.createTag = async (req, res) => {
    try {
        const{name ,description}= req.body;
    
        //validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //create tag in db
        const tagDetails = await Tag.create({
            name:name,
            description:description
        });
        console.log("tagDetails", tagDetails);

        //send response
        return res.status(200).json({
            success: true,
            message: "Tag created successfully"
        });
          

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:error.message
        }); 
    }

}

// get all tags

exports.getAllTags = async (req, res) => {

    try {
        const allTags = await Tag.find({},{name:true, description:true});

        //send response
        return res.status(200).json({
            success: true,
            message: "All tags fetched successfully",
            allTags
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:error.message
        }); 
    }
}