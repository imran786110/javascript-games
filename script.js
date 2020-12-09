"use strict";

const guessNumber = document.querySelector("#guess-my-number");
const rollIt = document.querySelector("#roll-it");

guessNumber.addEventListener("click", function () {
  window.location = "guess-my-number/index.html";
});

rollIt.addEventListener("click", function () {
  window.location = "roll-it/index.html";
});
