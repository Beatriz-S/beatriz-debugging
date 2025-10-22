// ===== DOM ELEMENT REFERENCES =====
// Get references to all HTML elements we need to interact with
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// ===== GAME STATE VARIABLES =====
let targetNumber;  // The random number the player needs to guess
let attempts = 0;  // Counter for how many guesses the player has made
const maxNumberOfAttempts = 5;  // Maximum number of guesses allowed

// ===== HELPER FUNCTIONS =====

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// ===== MAIN GAME LOGIC =====

// Checks the player's guess against the target number
function checkGuess() {
  // Get value from guess input element and convert to integer
  const guess = parseInt(guessInput.value, 10);
  
  // Validate input: ensure it's a number between 1 and 99
  if (Number.isNaN(guess) || guess < 1 || guess > 99) {
    return;
  }
  
  attempts = attempts + 1;

  // Hide all messages before showing the relevant one
  hideAllMessages();

  // Check if guess is correct
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    // Disable input and submit button when game is won
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  // Check if guess is incorrect
  if (guess !== targetNumber) {
    // Show appropriate "too high" or "too low" message
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    // Calculate and display remaining attempts
    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    
    // Check if max attempts reached after incorrect guess
    if (attempts === maxNumberOfAttempts) {
      maxGuessesMessage.style.display = '';
      submitButton.disabled = true;
      guessInput.disabled = true;
    }
  }

  // Clear the input field for next guess
  guessInput.value = '';

  // Show the reset button
  resetButton.style.display = '';
}

// Hides all feedback messages by looping through message elements
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

// ===== GAME INITIALIZATION =====

// Sets up a new game (called on page load and when reset button is clicked)
function setup() {
  // Get random number between 1 and 99
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts to zero
  attempts = 0;

  // Enable the input and submit button for new game
  submitButton.disabled = false;
  guessInput.disabled = false;

  // Clear all feedback messages from previous game
  hideAllMessages();
  
  // Hide reset button until first guess is made
  resetButton.style.display = 'none';
}

// ===== EVENT LISTENERS =====
// Attach click handlers to buttons
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// ===== INITIALIZE GAME =====
// Start the game when page loads
setup();
