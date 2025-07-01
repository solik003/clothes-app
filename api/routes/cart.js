
const router = require("express").Router();
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("../controllers/cart.controller");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

router.post("/", verifyToken, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
