const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");

const {

    validateRegister,

    validateLogin,

} = require("../validators/request/authValidator");

router.post(

    "/register",

    validateRequest(validateRegister),

    registerUser

);

router.post(

    "/login",

    validateRequest(validateLogin),

    loginUser

);

const protect =
  require("../middleware/authMiddleware");

router.get(
  "/profile",
  protect,
  getProfile
);
module.exports = router;