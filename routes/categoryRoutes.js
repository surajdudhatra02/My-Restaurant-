const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController')


const router = express.Router()

//routes

// Create Category
router.post('/create', authMiddleware, createCategoryController)

// Get All Category
router.get("/getAll", getAllCategoryController)

// update Category
router.put("/update/:id", updateCategoryController)

// delete Category
router.delete("/delete/:id", authMiddleware, deleteCategoryController )



module.exports = router