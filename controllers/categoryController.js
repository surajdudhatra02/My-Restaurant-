// create Category

const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const {title , imageUrl} = req.body

    // validation
    if(!title){
        return res.status(500).send({
            success:false,
            message:'Please provide category title or image'
        })
    }

    const newCategory = new categoryModel({ title , imageUrl});
    await newCategory.save();
    res.status(201).send({
        success:true,
        message: "category created",
        newCategory,
    })
 


  } catch (error) {
    console.log(error);
    res.status(500).send({
    sucess: false,
    message: "Error in Create Category API",
    error,
    });
  }
};

// Get All Category
const getAllCategoryController = async( req, res) => {
    try {

        const categories = await categoryModel.find({})

        if(!categories){
            return res.status(404).send({
                success:false,
                message:'Categories not found'
            })
        }

        res.status(200).send({
            success: true,
            totalCategories : categories.length,
            categories,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
        sucess: false,
        message: "Error in get all Category API",
        error,
    });
    }
}

// Update Category 

const updateCategoryController = async (req, res) => {
    try {
        
        const {id} = req.params
        const { title, imageUrl} = req.body

        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true}) // new true hase to j update thase
        if(!updatedCategory){
            return res.status(404).send({
                success:false,
                message:'Categories not found'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Category Updated Sucessfully',
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error in update Category API",
        error,
    });
    }
}

// Delete Category

const deleteCategoryController = async( req, res) => {
    try {
        const {id} = req.params // req.params mathi id get karyu
        if(!id){
            return res.status(500).send({
                success:false,
                message:'Please provide Category ID'
            })
        }

        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(500).send({
                success:false,
                message:'No category found'
            })
        }

        await categoryModel.findByIdAndDelete(id);
        res.send(200).status({
            sucess:true,
            message: 'Category Deleted Successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Delete Category API',
            error,
        })
    }
}



module.exports = { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController };
