const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const checkUserExists = await User.exists({ email: req.body.email }); //check if user exists or not by email which is unique field
    if (checkUserExists) {
      res.status(409).json({
        status: "Fail",
        message: "User already exists",
      });
    } else {
      //if user doesn't exists encrypt the password and create user
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;

      const newUser = await User.create(req.body);

      res.status(201).json({
        status: "Success",
        message: "User registered successfully 👍",
        data: {
          newUser,
        },
      });
    }
  } catch (error) {
    console.error("Error registering new user:", error);
    res.status(500).json({
      msg: "An unexpected error occurred",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    //check if user exists
    const checkUser = await User.findOne({ email: req.body.email }).lean();
    //if user exists compare the password
    if (checkUser) {
      // If user exists, compare the password
      const isMatched = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if (isMatched) {
        // If password matches, generate JWT token
        const { password, ...userDetails } = checkUser;
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_KEY);
        res.status(200).json({
          status: "Success",
          token,
          userDetails,
          message: "You Are Logged In ✅",
        });
      } else {
        // If password doesn't matches
        res.status(401).json({
          status: "Fail",
          message: "Incorrect Password",
        });
      }
    } else {
      //If user doesn't exists
      res.status(404).json({
        status: "Fail",
        message: "No User Found ❌",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: "Fail",
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    //Extract email and new password from req.body
    const { email, password } = req.body;

    // Check if both email and newPassword are provided
    if (!email || !password) {
      return res.status(400).json({
        status: "Fail",
        message: "Email and new password are required",
      });
    }

    //Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found ❌",
      });
    }

    //if user exists hash the new password
    const hashPassword = await bcrypt.hash(password, 10);
    //update user password
    user.password = hashPassword;
    //save the updated user to the database
    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Password reset Successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      status: "Fail",
      message: "Internal server error",
    });
  }
};
module.exports = { registerUser, loginUser, resetPassword };
