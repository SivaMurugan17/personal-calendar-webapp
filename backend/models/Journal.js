const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  date: { type: String },
  message: { type: String },
});

const journalSchema = mongoose.Schema({
  userId: { type: String },
  data: { type: [subSchema] },
});

module.exports = mongoose.model("journal", journalSchema);
