const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expert",
    required: true
  },

  name: String,

  email: String,

  phone: String,

  date: String,

  timeSlot: String,

  notes: String,

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed"],
    default: "Pending"
  }

}, { timestamps: true });

bookingSchema.index(
  { expertId: 1, date: 1, timeSlot: 1 },
  { unique: true }
);

module.exports = mongoose.model("Booking", bookingSchema);