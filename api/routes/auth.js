const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


//REGISTER
router.post("/register", async (req, res) => {
  try {
      if (!req.body.username || !req.body.email || !req.body.password) {
          return res.status(400).json({ message: "All fields are required." });
      }

      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
          return res.status(409).json({ message: "Email already in use." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
      });
      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error. Please try again." });
  }
});
module.exports = router;