

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {      // !started  --> It means started is false   ,Game has not STARTED yet..
    $("#level-title").text("Level " + level);  // Level will become --> 0..  , Level 0 will never be printed.
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
          // btn class is passed inside parameters of function
  var userChosenColour = $(this).attr("id");                  //  $(this).attr("id") --> gives the colour attribute of btn class
  userClickedPattern.push(userChosenColour);                  //  Store the colour into userClickedPattern

  playSound(userChosenColour);                                //  Play sound when user click a button
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);                   // userClickedPattern.length-1 -->  It show the cuurent lvel of the game..
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];                       // userClickedPattern array become empty with this line
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");     //  pressed class will be added to green id
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");  //  Animation
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
