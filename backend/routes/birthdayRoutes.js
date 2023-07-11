const express = require("express");
const { protect } = require("../middlewares/protectMiddleware");
const {
  getBirthday,
  postBirthday,
  deleteBirthday,
} = require("../controllers/birthdayController");
const router = express.Router();

router.get("/", protect, getBirthday);

router.post("/", protect, postBirthday);

router.delete("/:date/:person", protect, deleteBirthday);

module.exports = router;
