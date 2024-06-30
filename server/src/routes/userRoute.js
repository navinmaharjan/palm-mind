const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");

router.get("/user", getAllUsers);


module.exports = router;
