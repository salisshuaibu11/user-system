const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
 } = require("../controllers/userController.js");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile);
module.exports = router;
