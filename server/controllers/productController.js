const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

router.post("/", verifyToken, createProduct);
router.get("/", getProducts);
router.get("/:id", verifyToken, getProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
