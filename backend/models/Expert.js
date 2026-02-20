const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  experience: Number,

  rating: Number,

  availableSlots: [
    {
      date: String,
      slots: [String]
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Expert", expertSchema);