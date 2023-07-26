const mongoose = require("mongoose");

const formEntrySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  numUsers: {
    type: Number,
    required: true,
  },
  numProducts: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const FormEntry = mongoose.model("FormEntry", formEntrySchema);

module.exports = FormEntry;
