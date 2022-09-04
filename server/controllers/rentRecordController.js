const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const {
  createRentRecord,
  getRentRecords,
  getRentRecord,
  updateRentRecord,
  deleteRentRecord,
} = require("../services/rentRecordService");

router.post("/:id", verifyToken, createRentRecord);
router.get("/", getRentRecords);
router.get("/:id", verifyToken, getRentRecord);
router.put("/:id", verifyToken, updateRentRecord);
router.delete("/:id", verifyToken, deleteRentRecord);

module.exports = router;
