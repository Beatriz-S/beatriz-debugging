// ========================================
// DOM ELEMENT REFERENCES
// ========================================
// Get references to all HTML elements we'll need to interact with
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// ========================================
// GAME STATE VARIABLES
// ========================================
let targetNumber;  // The random number the user needs to guess
let attempts = 0;  // Counter for how many guesses the user has made
const maxNumberOfAttempts = 5;  // Maximum allowed guesses before game over

// ========================================
// UTILITY FUNCTION: Generate Random Number
// ========================================
// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// ========================================
// MAIN GAME LOGIC: Check User's Guess
// ========================================
// This function is called when the user clicks the submit button
// It compares the guess to the target number and provides feedback
function checkGuess() {
  // Get value from guess input element and convert to integer
  const guess = parseInt(guessInput.value, 10);
  // Increment the attempts counter
  attempts = attempts + 1;

  // Clear all previous messages before showing new ones
  hideAllMessages();

  // CASE 1: User guessed correctly
  if (guess === targetNumber) {
    // Display how many guesses it took
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    // Show success message
    correctMessage.style.display = '';

    // Disable further guessing
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  // CASE 2: User guessed incorrectly
  if (guess !== targetNumber) {
    // Provide hint: too low or too high
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    // Calculate and display remaining attempts
    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  // CASE 3: User reached maximum number of attempts
  if (attempts === maxNumberOfAttempts) {
    // Show max guesses message
    maxGuessesMessage.style.display = '';
    // Disable input and submit button - game over
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  // Clear the input field for next guess
  guessInput.value = '';

  // Show the reset button so user can start a new game
  resetButton.style.display = '';
}

// ========================================
// UTILITY FUNCTION: Hide All Messages
// ========================================
// Loops through all message elements and hides them
// This clears the UI before displaying new feedback
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

// ========================================
// GAME INITIALIZATION: Setup/Reset Game
// ========================================
// This function initializes a new game or resets an existing one
// Called when page loads and when user clicks reset button
function setup() {
  // Generate a new random target number between 1-99
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset the attempts counter to 0
  attempts = 0;

  // Re-enable the input field and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  // Hide all feedback messages for clean start
  hideAllMessages();
  // Hide reset button at game start
  resetButton.style.display = 'none';
}

// ========================================
// EVENT LISTENERS
// ========================================
// Attach click event handlers to buttons
submitButton.addEventListener('click', checkGuess);  // Check guess when submit is clicked
resetButton.addEventListener('click', setup);  // Reset game when reset is clicked

// ========================================
// GAME START
// ========================================
// Initialize the game when the page loads
setup();
