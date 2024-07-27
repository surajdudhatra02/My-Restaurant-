// Create Food

const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Details",
      });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

// Get all Food

const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "Food was not found",
      });
    }

    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Food API",
      error,
    });
  }
};

// Get One Food
const getOneFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);

    if (!food || !foodId) {
      return res.status(404).send({
        success: false,
        message: "Not found",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get One Food API",
      error,
    });
  }
};

// Get Food By Restaurant
const getFoodRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const food = await foodModel.find({ restaurant: restaurantId });

    if (!food || !restaurantId) {
      return res.status(404).send({
        success: false,
        message: "food base on restaurant",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get One Food API",
      error,
    });
  }
};

// Update food item

const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Not found",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Food item was updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Food API",
      error,
    });
  }
};

// delete food

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id
    if(!foodId){
        return res.status(404).send({
            success: false,
            message: 'Provide food id'
        })    
    }

    const food = await foodModel.findById(foodId)
    if(!food)
    {
        return res.status(404).send({
            success: false,
            message: 'Not found'
        })
    }
    await foodModel.findByIdAndDelete(foodId);
    return res.status(200).send({
        success: true,
        message: 'Food item was deleted'
    })  

  } catch (error) {
    console.log(error);
    res.status(500).send({
    success: false,
    message: "Error in Delete Food API",
    error,
    });
  }
};

// Place order 

const placeOrderController = async(req, res) => {
  try {
    const { cart } = req.body
    let total = 0;

    if (!cart){
      return res.status(500).send({
        success:false,
        message:'Somthing went wrong'
      })
    }

    // calculation
    cart.map ((i) => {
      total += i.price 
    })

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id
    });
    await newOrder.save(); 
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
    success: false,
    message: "Error in Place order API",
    error,
    });
  }
};

// change order status 

const orderStatusController = async(req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in order status API",
      error,
      });
  }
}

module.exports = {
  createFoodController,
  getAllFoodController,
  getOneFoodController,
  getFoodRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController
};
