

const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth"); // Directly import signup

router.post("/signup", signup); // Pass the function reference, not call it

module.exports = router;



