var socket;

function setup() {
  createCanvas(1920,700);

  background(51);

  socket = io.connect('https://sketchcodecool.herokuapp.com/');
  socket.on('mouse', newDrawing)
  
}

function readJson(){
  var fs = require('fs');
  var data = fs.readFileSync("words.json", "utf8");
  var data1 = JSON.parse(data);
  const randomElement = data1[Math.floor(Math.random() * array.length)];
  let guessword = document.getElementById('guessword');
  guessword.innerText(randomElement);
}

function newDrawing(data) {
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

const button = document.getElementById('getWord');
button.addEventListener('click', readJson);