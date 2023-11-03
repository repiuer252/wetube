const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

router.get("/user", userController.find_one);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
