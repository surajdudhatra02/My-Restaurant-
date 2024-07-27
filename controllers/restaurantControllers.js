// Create Restaurant

const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New Restaurent Create Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in create Restaurant API",
      error,
    });
  }
};

// Get all Restaurants

const getAllRestaurantContoller = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});

    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurent Available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Get all Restaurant API",
      error,
    });
  }
};

// Get Restaurants by id

const getRestaurantByIdContoller = async(req, res) => {
  try {
    
    const restaurantId = req.params.id 
    if(!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please Provide Restaurant ID'
      })
    }
    // find restaurant
    const restaurant = await restaurantModel.findById(restaurantId)
    if(!restaurant){
      return res.status(404).send({
        success : false,
        message: 'No restaurant found'
      })
    }
    res.status(200).send({
      success: true,
      restaurant,
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Get Restaurant By ID API",
      error,
    });
  }
};

// Delete Restaurant

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id 
    if(!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'No Restaurant or Provide restaurant ID'
      })
    }

    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message : "Restaurant Delete Sucessfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Delete Restaurant API",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantContoller,
  getRestaurantByIdContoller,
  deleteRestaurantController
};
