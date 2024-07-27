const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const { createFoodController, getAllFoodController, getOneFoodController, getFoodRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodControllers')
const adminMiddleware = require('../middlewares/adminMiddleware')


const router = express.Router()

//routes
// Create Food 
router.post ('/create', authMiddleware, createFoodController)

// get all food 
router.get ('/allfood', getAllFoodController)

// get one food 
router.get ('/get/:id' , getOneFoodController )

// get food by restaurent 
router.get ('/getByRestuarant/:id' , getFoodRestaurantController )

// update food 
router.put ('/update/:id' , authMiddleware, updateFoodController )

// delete food 
router.delete ('/delete/:id' , authMiddleware, deleteFoodController )

// Place Order 
router.post ('/placeorder' , authMiddleware, placeOrderController )

// order status
router.post ('/orderstatus/:id', adminMiddleware , authMiddleware, orderStatusController )








module.exports = router