const express = require("express");
const { protect } = require("../middlewares/protectMiddleware");
const {
  getDeadline,
  postDeadline,
  deleteDeadline,
} = require("../controllers/deadlineController");
const router = express.Router();

router.get("/", protect, getDeadline);

router.post("/", protect, postDeadline);

router.delete("/:date/:event", protect, deleteDeadline);

module.exports = router;
