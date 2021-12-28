const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({credentials: true, origin: true}));

app.get("/", (req, res) => {
  res.send("Hello, World!");
})

// Function to verify token is correct.
const checkJWT = (jwt) => {
  const token = jwt.split(" ")[1];

  if(token === "password") return true;
  else return false;
};

// Socket.io middleware to check if user is authenticated.
io.use((socket, next) => {
  const token = socket.handshake.headers["authorization"];

  if(checkJWT(token)) next();
  else next(new Error("not authorized"));
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
