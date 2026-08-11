const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const {
    successResponse,
} = require("../utils/apiResponse");

const AppError = require("../utils/AppError");
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {

      throw new AppError(

    "User already exists",

    400

);

    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
        password,
        salt
    );

   const user = await User.create({

    name,

    email,

    password: hashedPassword,

});

const userResponse = {

    id: user._id,

    name: user.name,

    email: user.email,

    createdAt: user.createdAt,

};

return successResponse(

    res,

    userResponse,

    "User registered successfully.",

    201

);

});
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({

        email,

    });

    if (!user) {

        throw new AppError(

    "User not found",

    404

);

    }

    const isMatch = await bcrypt.compare(

        password,

        user.password

    );

    if (!isMatch) {

        throw new AppError(

    "Invalid credentials",

    401

);

    }

    const token = jwt.sign(

        {

            id: user._id,

        },

        process.env.JWT_SECRET,

        {

            expiresIn: process.env.JWT_EXPIRE,

        }

    );

    return successResponse(

    res,

    { token },

    "Login successful."

);

});
const getProfile = asyncHandler(async (req, res) => {

    return successResponse(

    res,

    req.user,

    "Profile fetched successfully."

);

});
module.exports = {
  registerUser,
  loginUser,
  getProfile
};