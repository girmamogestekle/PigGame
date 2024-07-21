'use strict';

// Selecting Elements
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  diceEl.classList.add('hidden');
}

init();

// Assign Elements to Variables
let playerStyle = function (style) {
  document.querySelector(`.player--${activePlayer}`).classList.toggle(style);
};
let currentScoreEl = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};
let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer !== 0 ? 0 : 1;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  currentScore = 0;
  currentScoreEl();
};

// Rolling dice functionaltiy
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceRand = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRand}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (diceRand !== 1) {
      currentScore += diceRand;
      currentScoreEl();
    } else {
      switchPlayer();
    }
  }
});

// Holding dice functionaltiy
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playerStyle('player--winner');
      playerStyle('player--active');
      playing = false;
    } else {
      currentScore = 0;
      currentScoreEl();
      playerStyle('player--active');
      activePlayer = activePlayer !== 0 ? 0 : 1;
      playerStyle('player--active');
    }
    diceEl.classList.add('hidden');
  }
});

// New button functionality
btnNew.addEventListener('click', init);
