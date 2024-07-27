const mongoose = require("mongoose");

// schema

const orderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods",
      },
    ],
    payment: {},

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      status: ["preparing", "prepare", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

//exports

module.exports = mongoose.model("Orders", orderSchema);
