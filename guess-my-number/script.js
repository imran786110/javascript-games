"use strict";

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector(".again").style.display = "none";
document.querySelector(".dialog").style.display = "none";

let count = 0;
document.querySelector(".help").addEventListener("click", function () {
	if(count === 0) {
		count = 1;
		document.querySelector(".dialog").style.display = "block";	
	} else {
		document.querySelector(".dialog").style.display = "none";
		count = 0;
	}
});

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("⛔️ No number is specified");
  } else if (guess === number) {
    displayMessage("🎉 Correct number");

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = number;
    document.querySelector(".again").style.display = "block";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (guess !== number) {
    if (score > 1) {
      displayMessage(
        guess > number ? "Your numnber is high" : "Your numnber is low"
      );
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost the game");
      document.querySelector(".score").textContent = 0;
      document.querySelector(".again").style.display = "block";
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  document.querySelector(".again").style.display = "none";
  number = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
