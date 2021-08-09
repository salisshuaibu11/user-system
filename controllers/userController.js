const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel.js");

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    city,
    stateOfResident,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name, email, password, phoneNumber, city, stateOfResident
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      city: user.city,
      stateOfResident: user.stateOfResident,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser
}
