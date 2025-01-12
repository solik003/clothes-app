const express = require("express");
const router = express.Router();

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Product = require("../models/Product");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const { title, category, search } = req.query;

  try {
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" }; 
    }

    
    if (category) {
      query.categories = { $in: [category] };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
