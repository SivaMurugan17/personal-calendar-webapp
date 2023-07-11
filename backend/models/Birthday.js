const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  date: { type: String },
  persons: { type: [String] },
});

const birthdaySchema = mongoose.Schema({
  userId: { type: String },
  data: { type: [subSchema] },
});

module.exports = mongoose.model("birthday", birthdaySchema);
