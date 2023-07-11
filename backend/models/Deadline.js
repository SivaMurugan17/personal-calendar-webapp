const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  date: { type: String },
  events: { type: [String] },
});

const deadlineSchema = mongoose.Schema({
  userId: { type: String },
  data: { type: [subSchema] },
});

module.exports = mongoose.model("deadline", deadlineSchema);
