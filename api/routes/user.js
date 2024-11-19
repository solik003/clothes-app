const router = require('express').Router();
const express = require("express");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const User = require("../models/User");

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    console.log("Request Params:", req.params);
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log("Request id:", req.id);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    console.log("Request Params:", req.params.id);
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const { new: isNew } = req.query; 
      const users = isNew
        ? await User.find().sort({ _id: -1 }).limit(5) 
        : await User.find();
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
});

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    console.log("Stats route hit");
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json(err);
    }
});
  

module.exports = router;