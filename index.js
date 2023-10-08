//Loads up game instructions
window.addEventListener("load", function () {
  setTimeout(function () {
    alert(
      "Welcome to Duckslap! Ducks are attacking you and you have to slap away! The more you slap, the faster they come at you! Click on any duck to start the game!"
    );
  }, 100);
});

//Global variables
let sneakyInterval;
let gameplayInterval;
let isClicked = false;
let holdingVal;
let timer = 4000;
let score = 0;
let quack = new Audio("sounds/quack.mp3");
let sneaky = new Audio("sounds/sneaky.mp3");
let buzzer = new Audio("sounds/buzzer.mp3");
let isFailureDisplayed = false;
//Assigns 1st onClick event to all ducks
document.querySelectorAll(".duck-container > div").forEach(function (element) {
  element.setAttribute("onclick", "initiateGame()");
});

//Removes 1st onClick event in preparation for 2nd onClick event and calls the function that starts the game
function initiateGame() {
  document
    .querySelectorAll(".duck-container > div")
    .forEach(function (element) {
      element.removeAttribute("onclick");
    });
  startGame();
}

//Adds 2nd onClick event and background sounds
function startGame() {
  document
    .querySelectorAll(".duck-container > div")
    .forEach(function (element) {
      element.setAttribute(
        "onclick",
        "captureClick(this.getAttribute('class'))"
      );
    });

  sneaky.play();
  quack.play();

  sneakyInterval = setInterval(function () {
    sneaky.play();
  }, 76000);

  gameplayFunc();
}

//Detects when a user has clicked and performs the neccessary conditionals
function captureClick(className) {
  isClicked = true;

  //If user clicks on the correct image do the following:
  if (className === "duckslap") {
    score = score + 15;
    document.getElementById("score").textContent = score;
    var slap = new Audio("sounds/slap.mp3");
    slap.play();
    document.getElementById(holdingVal).classList.remove("duckslap");
    //Timer decrements whenever user clicks correctly on an image thereby speeding up the gameplay
    timer = timer - 100;
    //Else call the failure function
  } else {
    if (!isFailureDisplayed) {
      failure();
    }
  }
}

//This function gets called whenever a user goes against the game's rules for progressing
function failure() {
  isFailureDisplayed = true;
  document.getElementById(holdingVal).classList.remove("duckslap");
  clearInterval(sneakyInterval);
  clearInterval(gameplayInterval);
  sneaky.pause();
  buzzer.play();
  document.querySelector("body").classList.add("failure");
  document.querySelectorAll(".waviy > span").forEach(function (element) {
    element.style.animationPlayState = "paused";
  });
  setTimeout(function () {
    alert(
      "Oh no! You've missed a duck! Your score is: " +
        score +
        " \nRefresh the page to try again and better your score!"
    );
    isFailureDisplayed = false;
  }, 100);
}

//This is the main gameplay function
function gameplayFunc() {
  //Clears the interval before creating a new interval with shorterned timer
  clearInterval(gameplayInterval);

  //Random generated value is responsible for changing of images at random
  let randomVal = Math.floor(Math.random() * 8 + 1);
  //Holds the previous random value
  holdingVal = randomVal;
  document.getElementById(randomVal).classList.add("duckslap");

  quack.play();

  //If no click event has been detected just before the next image pops up, failure function is called
  setTimeout(function () {
    if (!isClicked) {
      if (!isFailureDisplayed) {
        failure();
      }
    }
    isClicked = false;
  }, timer);

  gameplayInterval = setInterval(gameplayFunc, timer);
}
