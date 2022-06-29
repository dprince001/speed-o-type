const inputText = document.getElementById('input-text');
const settingBtn = document.getElementById('setting-btn');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const gameOverContainer = document.getElementById('end-game-container');
const word = document.getElementById('word');
const diffContainer = document.querySelector('.difficulty-container');
const difficultyCtrl = document.querySelector('#difficulty');
const reloadBtn = document.querySelector('#reload-btn');
const getSetContainer = document.querySelector('.gameStartsIn');
const countDown = document.querySelector('.countdown');



const words = [
  'good',
  'south',
  'independent',
  'steering',
  'gold',
  'home',
  'artificial',
  'intelligence',
  'nine',
  'fame',
  'dismiss',
  'drop',
  'caring',
  'sing',
  'utensil',
  'airplane',
  'pilot',
  'basket',
  'juice',
  'ukraine',
  'captain',
  'this',
  'game',
  'is',
  'difficult',
  'south',
  'independent',
  'steering',
  'gold',
  'home',
  'artificial',
  'intelligence',
  'nine',
  'fame',
  'dismiss',
  'drop',
  'caring',
  'sing',
  'utensil',
  'airplane',
  'pilot',
  'basket',
  'juice',
  'ukraine',
  'captain',
  'this',
  'game',
  'is',
  'difficult',
];

// let words;

// const getWords = async () => {
//   try {
//     // const data = await fetch("https://api.codetabs.com/v1/proxy?quest=<https://random-word-api.herokuapp.com/word?number=5000>");
//     console.log(data);
//     words = await data.json();
//     console.log(words);
//   }catch(error) {
//     alert(error);
//   }
// }
// getWords();


settingBtn.addEventListener('click', () => {
  diffContainer.classList.toggle('show')
});

inputText.focus();

let randomWord;
let score = 0;
let time = 10;
let difficultyLevel;


function gameOn() {
    // generate random word and place it in the box
    function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }

    function addWordToDom() {
      randomWord = getRandomWord()
      word.innerHTML = randomWord;
    }
    addWordToDom();

    const timeInterval = setInterval(updateTime, 1000);

    // start timer
    function updateTime() {
      time--;
      timeEl.innerHTML = time;

      if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
      }
    }

    // update score
    function updateScore() {
      score += 2;
      scoreEl.innerHTML = score;
    }

    // check for correct answer
    difficultyCtrl.addEventListener('change', (e) => {
      difficultyLevel = e.target.value;
    });
    
    // check for word match
    inputText.addEventListener('input', (e) => {
      const userInput = e.target.value.toLowerCase();
    
      if(userInput === randomWord) {
        addWordToDom();
        updateScore();
        e.target.value = ''; 
    
        if(difficultyLevel === 'hard') {
          time += 3;
        } else if(difficultyLevel === 'medium') {
          time += 4;
        } else {
          time += 5;
        }
    
        updateTime();
      }
    });

    const gameOver = () => {
      gameOverContainer.innerHTML = `
        <h1>Game Over</h1>
        <p>Your final score is: ${score}</p>
      `;
      gameOverContainer.style.display = 'flex';
    };
}



function getSet() {
  let count = 4;
  const timeInterval = setInterval(() => {
    count--;
    countDown.textContent = count;

    if(count === 0) {
      clearInterval(timeInterval);
      gameOn();
      getSetContainer.style.display = 'none';
    }
  }, 1000);
}


function init() {
  getSet();
}

window.addEventListener('load', init);
reloadBtn.addEventListener('click', () => {
  window.location.reload();
});