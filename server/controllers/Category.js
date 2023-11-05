const Category = require('../models/category');

//create category

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
        const CategoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log("categoryDetails", CategoryDetails);

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

// get all category

exports.showAllCategories = async (req, res) => {

    try {
        const allCategory = await Category.find({},{name:true, description:true});

        //send response
        return res.status(200).json({
            success: true,
            message: "All categories fetched successfully",
            allCategory
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:error.message
        }); 
    }
}

// get category details

exports.categoryPageDetails = async (req,res)=>{
    try {
        // get category id
        const {categoryId} = req.body;
        //get courses for that category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        //validate category
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
        //get coursed for different category
        const differentCategories = await Category.find({_id:{$ne:categoryId}}).populate("courses").exec(); 

        //get top selling courses
        const topSellingCourses = await Course.find({}).sort({numberOfStudentsEnrolled:("desc")}).limit(10).exec();
        //get top rated courses

        const topRatedCourses = await Course.find({}).sort({averageRating:("desc")}).limit(10).exec();

        //send response

        return res.status(200).json({
            success:true,
            message:"Category page details fetched successfully",
            selectedCategory,
            differentCategories,
            topSellingCourses,
            topRatedCourses
        })

    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}
