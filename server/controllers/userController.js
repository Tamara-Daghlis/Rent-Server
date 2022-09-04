const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
} = require("../services/userService");

router.post("/", register);
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id", verifyToken, updateUser);
router.get("/:id", verifyToken, deleteUser);
router.post("/login", login);

module.exports = router;
