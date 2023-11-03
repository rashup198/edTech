const Category = require('../models/category');

//create tag

exports.createCategory = async (req, res) => {
    try {
        const{name ,description}= req.body;
    
        //validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //create category in db
        const categoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log("categoryDetails", categoryDetails);

        //send response
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
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

exports.getallCategory = async (req, res) => {

    try {
        const allCategory = await Category.find({},{name:true, description:true});

        //send response
        return res.status(200).json({
            success: true,
            message: "All categories fetched successfully",
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