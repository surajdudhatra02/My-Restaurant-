const mongoose = require("mongoose");

// schema

const foodSchema = new mongoose.Schema(
  {
    title:{
        type: String,
        required: [true, 'Food title is require'],
    },

    description:{
        type: String,
        required: [true, 'Food description is required']
    },
    price:{
        type: String,
        required: [true, 'food price is required']
    },
    imageUrl : {
        type: String,
        default:"https://www.creativefabrica.com/wp-content/uploads/2020/02/12/Food-Logo-Graphics-1-99-580x386.jpg"
    },
    foodTags: {
        type: String,
    },

    category: {
        type: String,
    },
    code:{
        type : String,
    },
    isAvailable : {
        type: Boolean,
        default:true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5,
    },
    ratingCount: {
        type: String,
    },
  },
  { timestamps: true }
);

//exports

module.exports = mongoose.model("Foods", foodSchema);
