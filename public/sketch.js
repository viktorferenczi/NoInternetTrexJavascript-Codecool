var socket;
const clearButton = document.getElementById('clear-board');
const startButton = document.getElementById('getWord');
let stateClient = 0;
startButton.addEventListener('click', start)

startButton.style.display = 'none';

function start(){
  socket.emit('start');
  socketOnStart();
}

function setup() {
  createCanvas(1920,700);

  background('grey');

  socket = io.connect('/');
  socket.on('mouse', newDrawing)
  socket.on('board', boardClear)
  socket.on('start', socketOnStart)
  socket.on('init', (state)=>{
    stateClient = state;
    document.getElementById("timer").innerText = "Clear table"
  })
}

function newDrawing(data) {
  console.log("key")
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 10,10)
}

function mouseDragged(){
    console.log('Sending: ' + mouseX + ', ' + mouseY);
    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);

    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 10,10);
}
clearButton.addEventListener('click', sendBoardSize)
clearButton.addEventListener('click', start)

function sendBoardSize(){
  var canvasSize = {
    width : canvas.width,
    height : canvas.height
  }

  socket.emit('board', canvasSize)
  boardClear(canvasSize)
}

function socketOnStart(){
  doIt(stateClient);
}

function boardClear(canvasSize){
  console.log("kex")
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.rect(0, 0, canvasSize.width, canvasSize.height);
  ctx.fillStyle = "grey";
  ctx.fill();
}

function doIt(seconds) {
  clearButton.removeEventListener('click',start)
  clearButton.removeEventListener('click',sendBoardSize)
  document.getElementById("timer").innerText = "Your Time for the next clear:" + seconds+"s";
  if (seconds > 0) {
    handle = setTimeout(function() {
      doIt(seconds - 1);
    }, 1000);
  } else {
      document.getElementById("timer").innerText = "Ready to clear";
      document.getElementById('guessword').innerText =  ''
      clearButton.addEventListener('click', sendBoardSize)
      clearButton.addEventListener('click', start)
  }
}