const express = require("express");
const router = express.Router();
const { registerUser, loginUser, resetPassword } = require("../controllers/userController");

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/reset-password", resetPassword)

module.exports = router;
