/* 
 1 - Tablero en javascript
 2 - Localizar el tablero
 3 - Crear el input
 4 - Localizar el input
 5 - Obtener la palabra
 6 - Guardar la palabra
 7 - Pintar la palabra

*/
const words = [
  'amarillo',
  'carta',
  'azotea',
  'sol',
  'mejilla',
  'antena',
  'madre',
  'tres',
  'arte',
  'cuadro',
  'cena',
  'suelo',
  'mar',
  'plaza',
  'luna',
  'tridente',
  'abuelo',
  'tormenta'
];
const tries = 7;

const gameTableElement = document.getElementById('game-table');
const formElement = document.getElementById('form');
const winMessageElement = document.getElementById('win-message');
const tryAgainBtnElement = document.getElementById('try-again-btn');

const letterColors = {
  correct: 'green',
  present: 'orange',
  incorrect: 'grey'
};

let userWord;
let secretWord;
let currentRow = 0;
let wordToReplaceLetters;
let haveYouWon = false;

const createGameTable = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < tries; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('game-row');
    for (let j = 0; j < secretWord.length; j++) {
      const newLetter = document.createElement('span');
      newLetter.classList.add('letter');
      newRow.append(newLetter);
    }
    fragment.append(newRow);
  }
  gameTableElement.append(fragment);
};

const generateRandomWord = () => {
  const randomNumber = Math.floor(Math.random() * words.length);
  secretWord = words[randomNumber];
  wordToReplaceLetters = secretWord;
  console.log(secretWord);
  createGameTable();
};

const changeCurrentRow = () => {
  currentRow++;
};

const replaceLetter = userLetter => {
  wordToReplaceLetters = wordToReplaceLetters.replace(userLetter, '-');
};

const paintLetters = (color, position) => {
  gameTableElement.children[currentRow].children[position].classList.add(color);
};

const showWinMessage = () => {
  winMessageElement.style.display = 'block';
};

const resetGame = () => {
  currentRow = 0;
  haveYouWon = false;
  winMessageElement.style.display = 'none';
  gameTableElement.innerHTML = '';
  generateRandomWord();
};

tryAgainBtnElement.addEventListener('click', resetGame);

const printAllCells = () => {
  for (let index = 0; index < userWord.length; index++) {
    paintLetters(letterColors.correct, index);
  }
  showWinMessage();
};

const checkPresentAndIncorrectLetters = () => {
  for (let i = 0; i < userWord.length; i++) {
    const userLetter = userWord[i];
    const element = gameTableElement.children[currentRow].children[i];
    if (wordToReplaceLetters.includes(userLetter)) {
      replaceLetter(userLetter);
      paintLetters(letterColors.present, i);
    } else if (!element.classList.contains(letterColors.correct)) {
      paintLetters(letterColors.incorrect, i);
    }
  }
  changeCurrentRow();
};

const checkCorrectLetters = () => {
  for (let i = 0; i < userWord.length; i++) {
    const userLetter = userWord[i];
    const secretLetter = secretWord[i];
    if (userLetter === secretLetter) {
      replaceLetter(userLetter);
      paintLetters(letterColors.correct, i);
    }
  }
  checkPresentAndIncorrectLetters();
};

const printWord = () => {
  for (let i = 0; i < userWord.length; i++) {
    gameTableElement.children[currentRow].children[i].textContent = userWord[i].toUpperCase();
  }

  checkWin();
};

const checkWin = () => {
  haveYouWon = userWord === secretWord;

  if (haveYouWon) {
    console.log('WIN');
    printAllCells();
  } else {
    checkCorrectLetters();
  }
};

generateRandomWord();

formElement.addEventListener('submit', event => {
  event.preventDefault();
  userWord = event.target.word.value;
  printWord();
  event.target.reset();
});
