// Create an array to store the history of changes to the textarea
const history = [];
let currentPosition = -1;

// Get the textarea element
const textarea = document.getElementById("textarea");

// Add an event listener to the textarea to track changes
textarea.addEventListener("input", () => {
  // Remove all changes that were undone
  history.splice(currentPosition + 1, history.length - currentPosition - 1);

  // Add the new change to the history array
  history.push(textarea.value);

  // Update the current position in the history array
  currentPosition = history.length - 1;
});

// Get the undo and redo buttons
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");

// Add event listeners to the buttons
undoButton.addEventListener("click", () => {
  if (currentPosition > 0) {
    // Decrement the current position in the history array
    currentPosition--;

    // Set the value of the textarea to the previous value in the history array
    textarea.value = history[currentPosition];
  }
});

redoButton.addEventListener("click", () => {
  if (currentPosition < history.length - 1) {
    // Increment the current position in the history array
    currentPosition++;

    // Set the value of the textarea to the next value in the history array
    textarea.value = history[currentPosition];
  }
});