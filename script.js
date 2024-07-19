'use strict';

// Selecting Elements
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
const scores = [0, 0];
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Assign Elements to Variables
let playerStyle = function (style) {
  document.querySelector(`.player--${activePlayer}`).classList.toggle(style);
};
let scoreContent = function (elementName) {
  document.getElementById(elementName).textContent = 0;
};
let diceAddHiidenStyle = function () {
  diceEl.classList.add('hidden');
};
let diceRemoveHiidenStyle = function () {
  diceEl.classList.add('hidden');
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

let removePlayerWinnerStyle = function (playerNumber) {
  document
    .querySelector(`.player--${playerNumber}`)
    .classList.contains('player--winner')
    ? document
        .querySelector(`.player--${playerNumber}`)
        .classList.remove('player--winner')
    : document
        .querySelector(`.player--${playerNumber - 1}`)
        .classList.remove('player--winner');
};
let switchActivePlayer = function (playerNumber) {
  if (playerNumber === 1) {
    document
      .querySelector(`.player--${playerNumber}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${playerNumber - 1}`)
      .classList.add('player--active');
  }
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

    if (scores[activePlayer] >= 100) {
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
    diceAddHiidenStyle();
  }
});

// New button functionality
btnNew.addEventListener('click', function () {
  playing = true;
  scoreContent(`score--0`);
  scoreContent(`score--1`);
  activePlayer = 0;
  scoreContent(`current--0`);
  scoreContent(`current--1`);

  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;

  removePlayerWinnerStyle(1);
  switchActivePlayer(1);
  diceAddHiidenStyle();
});
