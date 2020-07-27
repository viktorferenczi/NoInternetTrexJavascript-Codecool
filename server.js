var express = require("express");
var app = express();
let state = 100;
let player = {
  countp: 0,
};

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
  console.log("The server is running :" + port);
});

app.use(express.static("public"));

var socket = require("socket.io");

var io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("New connection: " + socket.id);
  socket.emit("init", state);
  socket.on("mouse", mouseMsg);
  socket.on("board", clearBoard);
  socket.on("start", onStart);
  socket.broadcast.emit("online", player);
  socket.emit("online", player);
  console.log("Player count: " + player.countp);
  player.countp = player.countp + 1;

  function onStart() {
    state = 100;
    socket.broadcast.emit("start", state);
  }

  function clearBoard(canvasSize) {
    socket.broadcast.emit("board", canvasSize);
    console.log("The sent size: " + canvasSize.width);
  }

  function mouseMsg(data) {
    socket.broadcast.emit("mouse", data);
    console.log(data);
  }
}

app.get("/go", (res, req) => console.log("go"));
