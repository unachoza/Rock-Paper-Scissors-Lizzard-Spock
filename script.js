import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreElement = document.getElementById('playerScore');
const playerChoiceElement = document.getElementById('playerChoice');
const computerScoreElement = document.getElementById('computerScore');
const computerChoiceElement = document.getElementById('computerChoice');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');
const resultText = document.getElementById('resultText');

const gameOptions = {
  0: 'rock',
  1: 'paper',
  2: 'scissors',
  3: 'lizard',
  4: 'spock',
};
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'], title: 'rock', element: computerRock },
  paper: { name: 'Paper', defeats: ['rock', 'spock'], title: 'paper', element: computerPaper },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'], title: 'scissors', element: computerScissors },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'], title: 'lizard', element: computerLizard },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'], title: 'spock', element: computerSpock },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerPick;

// Reset all 'selected' icons, remove confetti
const resetSelected = () => {
  allGameIcons.forEach((icon) => icon.classList.remove('selected'));
  stopConfetti();
  removeConfetti();
};

// Reset score & playerChoice/computerChoice
const resetAll = () => {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreElement.textContent = playerScoreNumber;
  computerScoreElement.textContent = computerScoreNumber;
  playerChoiceElement.textContent = '';
  computerChoiceElement.textContent = '';
  resultText.textContent = '';
  resetSelected();
};
window.resetAll = resetAll;

const computerRandomChoice = () => (computerPick = choices[gameOptions[Math.floor(Math.random() * Math.floor(5))]]);

const displayComputerChoice = () => {
  computerPick.element.classList.add('selected');
  computerChoiceElement.textContent = ` -- ${computerPick.name}`;
};

const updateScore = (playerChoice) => {
  if (playerChoice === computerPick.title) resultText.textContent = "It's a tie.";
  else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerPick.title) > -1) {
      startConfetti();
      resultText.textContent = 'You Won!';
      playerScoreNumber++;
      playerScoreElement.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'You Lost!';
      computerScoreNumber++;
      computerScoreElement.textContent = computerScoreNumber;
    }
  }
};

const checkResult = (playerChoice) => {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
};

// Passing player selection value and styling icons
const select = (playerChoice) => {
  checkResult(playerChoice);
  choices[playerChoice].element.classList.add('selected');
  playerChoiceElement.textContent = ` -- ${choices[playerChoice].name}`;
};
window.select = select;

resetAll();
