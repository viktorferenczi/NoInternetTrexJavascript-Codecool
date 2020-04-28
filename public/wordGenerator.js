function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function getGuessWord() {
let words = ["cat","dog","chicken","glass","universe","Earth","mouse","Steve Jobs","Apple","Heroku","intel","data","engine"]
const randomElement = getRandomNumber(0,words.length-1);

document.getElementById('guessword').innerText =  words[Math.floor(Math.random() * words.length)]
}

const button = document.getElementById('getWord');
button.addEventListener('click',getGuessWord)



