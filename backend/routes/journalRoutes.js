const express = require("express");
const { protect } = require("../middlewares/protectMiddleware");
const { getJournal, postJournal } = require("../controllers/journalController");
const router = express.Router();

router.get("/", protect, getJournal);

router.post("/", protect, postJournal);

module.exports = router;
