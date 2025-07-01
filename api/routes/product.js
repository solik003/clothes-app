
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

router.post("/", verifyTokenAndAdmin, productController.createProduct);
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
router.get("/find/:id", productController.getProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
