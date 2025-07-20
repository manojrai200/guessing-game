



/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
function generateWinningNumber (){
    return Math.ceil(Math.random()*100);
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class Game{
    constructor (){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    };

    difference (){
        return Math.abs(this.playersGuess - this.winningNumber);
    };

    isLower (){
        if(this.playersGuess < this.winningNumber) return true;
        return false;
    };

  playersGuessSubmission (guess) {
    if (
      typeof guess !== 'number' ||
      isNaN(guess) ||
      guess < 1 ||
      guess > 100
    ) {
      throw ('That is an invalid guess.');
    }
  
    this.playersGuess = guess;
    return this.checkGuess(this.playersGuess);
  }

  checkGuess (guess){
    if(guess === this.winningNumber) return 'You Win!';

    if(this.pastGuesses.indexOf(guess) !== -1) return 'You have already guessed that number.';
    else {
        this.pastGuesses.push(guess);
    }
    if(this.pastGuesses.length > 4) return 'You Lose.';
    if(Math.abs(guess - this.winningNumber < 10)) return "You're burning up!";
    if(Math.abs(guess - this.winningNumber < 25)) return "You're lukewarm.";
    if(Math.abs(guess - this.winningNumber < 50)) return "You're a bit chilly.";
    if(Math.abs(guess - this.winningNumber < 100)) return "You're ice cold!";

  };

  provideHint (){
    let hintAarray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintAarray);
  };

};

function newGame (){
    return new Game();
}
                           

let game = newGame();

const input = document.getElementById("playerInput");
const submitBtn = document.getElementById("submitBtn");
const hintBtn = document.getElementById("hintBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");

// Helper to update attempts
function updateAttempts() {
  const left = 5 - game.pastGuesses.length;
  attemptsDisplay.textContent = `Attempts Left: ${left}`;
}

// Display the guess result
function displayResult(result) {
  message.textContent = result;
  updateAttempts();

  if (result === 'You Win!' || result === 'You Lose.') {
    submitBtn.disabled = true;
    hintBtn.disabled = true;
    input.disabled = true;
  }
}

// Submit guess
submitBtn.addEventListener("click", () => {
  let guess = Number(input.value);
  try {
    const result = game.playersGuessSubmission(guess);
    displayResult(result);
  } catch (e) {
    message.textContent = e;
  }
  input.value = '';
  input.focus();
});

// Provide hint
hintBtn.addEventListener("click", () => {
  const hint = game.provideHint();
  message.textContent = `One of these is correct: ${hint.join(', ')}`;
});

// Reset game
resetBtn.addEventListener("click", () => {
  game = newGame();
  message.textContent = "New game started! Guess a number between 1 and 100.";
  updateAttempts();
  input.disabled = false;
  submitBtn.disabled = false;
  hintBtn.disabled = false;
  input.value = "";
  input.focus();
});

updateAttempts();
