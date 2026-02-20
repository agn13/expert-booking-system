const router = require("express").Router();

const {
  createBooking,
  getBookingsByEmail,
  updateStatus
} = require("../controllers/bookingController");

router.post("/", createBooking);

router.get("/", getBookingsByEmail);

router.patch("/:id/status", updateStatus);

module.exports = router;