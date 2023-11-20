const express = require("express");

const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const session = require("express-session");
const app = express();

const server = http.createServer(app);

const body_parser = require("body-parser");

app.use("/uploads", express.static("uploads"));
app.use(body_parser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(body_parser.json());

app.use(
  session({
    secret: "1234567890qwertyuiopasdfghjklzxcvbnm[]:",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const route = require("./src/app/routes/route");
app.use("/api", route);

// socket io

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit("user joined");
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {});
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
