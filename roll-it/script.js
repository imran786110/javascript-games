"use strict";

// select elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// declaring input and labels for player names
const input0El = document.querySelector("#inputname--0");
const input1El = document.querySelector("#inputname--1");
const name0El = document.querySelector("#name--0");
const name1El = document.querySelector("#name--1");

let scores, currentScore, activePlayer, playing;

const init = function () {
  // set names to player 1 and player 2

  if (
    input0El.classList.contains("hidden") &&
    input1El.classList.contains("hidden")
  ) {
    name0El.classList.remove("hidden");
    name1El.classList.remove("hidden");
  } else {
    name0El.classList.add("hidden");
    name1El.classList.add("hidden");
  }
  input0El.addEventListener("change", function (e) {
    document.querySelector("#name--0").textContent = e.target.value;
    input0El.classList.add("hidden");
    name0El.classList.remove("hidden");
  });
  input1El.addEventListener("change", function (e) {
    document.querySelector("#name--1").textContent = e.target.value;
    input1El.classList.add("hidden");
    name1El.classList.remove("hidden");
  });
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// starting initial conditions
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3.  check if dice is equal to 1, if yes, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;

      // to check if 100 is reached
      // the winning condition
      const sum = scores[activePlayer] + currentScore;
      if (sum >= 100) {
        document.getElementById(`score--${activePlayer}`).textContent = sum;
        // game is complete
        diceEl.classList.add("hidden");
        playing = false;
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");
      }
    } else {
      // assign the scored sum to the respected player
      const sum = (scores[activePlayer] += currentScore);
      document.getElementById(`score--${activePlayer}`).textContent = sum;
      // switch player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnNew.addEventListener("click", init);
