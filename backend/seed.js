const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Expert = require("./models/Expert");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  console.log("Connected");

  await Expert.deleteMany();

  await Expert.insertMany([
    {
      name: "Rahul Sharma",
      category: "Career Coach",
      experience: 5,
      rating: 4.5,
      availableSlots: [
        {
          date: "2026-02-21",
          slots: ["10:00 AM", "11:00 AM", "2:00 PM"]
        },
        {
          date: "2026-02-22",
          slots: ["9:00 AM", "1:00 PM"]
        }
      ]
    },
    {
      name: "Priya Mehta",
      category: "Fitness Trainer",
      experience: 7,
      rating: 4.8,
      availableSlots: [
        {
          date: "2026-02-21",
          slots: ["8:00 AM", "6:00 PM"]
        }
      ]
    }
  ]);

  console.log("Experts Seeded");
  process.exit();
});