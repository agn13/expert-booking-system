const Expert = require("../models/Expert");
const Booking = require("../models/Booking");

exports.getExperts = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;
    const limit = 10;

    const query = {};

    if (req.query.category)
      query.category = req.query.category;

    if (req.query.search)
      query.name = {
        $regex: req.query.search,
        $options: "i"
      };

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(experts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};


exports.getExpertById = async (req, res) => {

  try {

    const expert = await Expert.findById(req.params.id);

    if (!expert)
      return res.status(404).json({ message: "Expert not found" });

    const bookings = await Booking.find({
      expertId: expert._id
    });

    res.json({
      expert,
      bookedSlots: bookings.map(b => ({
        date: b.date,
        timeSlot: b.timeSlot
      }))
    });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};