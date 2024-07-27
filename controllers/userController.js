// Get user info.

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    // find user

    const user = await userModel.findById({ _id: req.body.id });

    // validation

    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "User not found",
      });
    }

    //hide password
    // user.password = undefined

    // response
    res.status(200).send({
      sucess: true,
      message: "User get sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Get user API",
      error,
    });
  }
};

// Update user

const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation

    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "User not found",
      });
    }

    // Update

    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName; // username che  to ani andar user name  che e rakho kato pachi latest aave che ani sathe replace kari nakho
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // user save
    await user.save();
    res.status(200).send({
      sucess: true,
      message: "User Update Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in update user API",
      error,
    });
  }
};

// Update user password

const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });

    // validation
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "User not found",
      });
    }

    // get data from user

    const {oldPassword, newPassword} = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Provide old or new password",
      });
    }

    // check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password update !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in password update API",
      error,
    });
  }
};

// Reset Password

const resetPasswordController = async (req, res) => {
    try{
      const {email, newPassword, answer} = req.body
      if( !email || !newPassword || !answer){
        return res.status(500).send({
          success:false,
          message:'Please Provide All Fields'
        })
      }
      const user = await userModel.findOne({email, answer})
      if(!user){
        return res.status(500).send({
          success:false,
          message:'User not found or invalid answer'
        })
      }
     // hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Password Reset Sucessfully",
      })
    }
   catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Password Reset API',
      error
    })
  }
}

// Delete Profile

const deleteProfileController = async(req,res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success:true,
      message: 'Your account has been deleted',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message: 'Error in Delete Profile API',
      error
    })
  }
}

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController
};
