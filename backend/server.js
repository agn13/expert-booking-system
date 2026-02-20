const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Allow all origins safely (needed for Render + Vercel + Socket.io polling)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
}));

app.use(express.json());

// ✅ Socket.io with proper CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  }
});

// attach io to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// routes
app.use("/experts", require("./routes/expertRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));

// socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
