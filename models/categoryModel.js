const mongoose = require("mongoose");

// schema

const categorySchema = new mongoose.Schema(
  {
   title:{
    type:String,
    required: [true, 'category title is required']
   },

   imageUrl : {
    type: String,
    default:"https://www.creativefabrica.com/wp-content/uploads/2020/02/12/Food-Logo-Graphics-1-99-580x386.jpg"
   }

  },
  { timestamps: true }
);

//exports

module.exports = mongoose.model("Category", categorySchema);
