const mongoose = require("mongoose");

// schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: String,
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    userType: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default: "https://images.app.goo.gl/AiBQbtWdJZnSRHgr9",
    },
    answer: {
      type: String,
      require: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

//exports

module.exports = mongoose.model("User", userSchema);
