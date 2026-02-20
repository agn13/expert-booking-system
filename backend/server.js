const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

// Attach io to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/experts", require("./routes/expertRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

server.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);