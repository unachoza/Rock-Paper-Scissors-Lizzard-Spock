import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');

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

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'], title: 'rock', element: computerRock },
  paper: { name: 'Paper', defeats: ['rock', 'spock'], title: 'paper', element: computerPaper },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'], title: 'scissors', element: computerScissors },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'], title: 'lizard', element: computerLizard },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'], title: 'spock', element: computerSpock },
};
const gameOptions = {
  0: 'rock',
  1: 'paper',
  2: 'scissors',
  3: 'lizard',
  4: 'spock',
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
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSelected();
};
window.resetAll = resetAll;

const computerRandomChoice = () => {
  const computerChoiceNumber = Math.floor(Math.random() * Math.floor(5));
  return (computerPick = choices[gameOptions[computerChoiceNumber]]);
};

const displayComputerChoice = () => {
  computerPick.element.classList.add('selected');
  computerChoiceEl.textContent = ` -- ${computerPick.name}`;
};

// Check result, increase scores, update resultText
const updateScore = (playerChoice) => {
  if (playerChoice === computerPick.title) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerPick.title) > -1) {
      startConfetti();
      resultText.textContent = 'You Won!';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'You Lost!';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
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
  playerChoiceEl.textContent = `--- ${choices[playerChoice].title}`;
};
window.select = select;

// On startup, set initial values
resetAll();
