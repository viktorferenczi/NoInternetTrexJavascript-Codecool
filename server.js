var express = require('express');
var app = express();


const port = process.env.PORT || 3000;
var server = app.listen(port, () =>{
    console.log('Megy a szerver itten :' + port)    
});

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log("uj konnekcio: " + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        console.log(data);

    }
}

app.get('/go',(res,req) => console.log('xd'))