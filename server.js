var express = require('express');
var app = express();
let state = 10;


const port = process.env.PORT || 3000;
var server = app.listen(port, () =>{
    console.log('Megy a szerver itten :' + port)    
});

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("uj konnekcio: " + socket.id);
    socket.emit('init', state);
    socket.on('mouse', mouseMsg);
    socket.on('board', clearBoard);
    socket.on('start', onStart);

    function onStart() {
        state = 10;
        socket.broadcast.emit('start', state)
    }

    function clearBoard(canvasSize){
        socket.broadcast.emit('board',canvasSize);
        console.log("sikerult elkuldeni a meretet: " + canvasSize.width);
    }

    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        console.log(data);
    }
}

app.get('/go',(res,req) => console.log('xd'))