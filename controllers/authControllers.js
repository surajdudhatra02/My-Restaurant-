const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    // validation

    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // check user

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registered, please Login",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Sucessfully Registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register",
      error,
    });
  }
};

// Login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body; 
    //validation

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please enter email or password",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid",
      });
    }

    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "60d",
    });


    res.status(200).send({
      success: true,
      message: "Login Sucessfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
