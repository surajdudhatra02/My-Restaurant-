const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const { createRestaurantController, getAllRestaurantContoller, getRestaurantByIdContoller, deleteRestaurantController } = require('../controllers/restaurantControllers')


const router = express.Router()

//routes
// Create restaurant || POST

router.post('/create', authMiddleware, createRestaurantController)

// Get all restaurents || GET
router.get("/getAll", getAllRestaurantContoller)

// Get Restaurants By id || GET
router.get('/get/:id', getRestaurantByIdContoller)

// Delete Restaurant || DELETE
router.delete('/delete/:id', authMiddleware, deleteRestaurantController)





module.exports = router