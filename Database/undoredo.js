const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
const undoRedo = new UndoRedo();

// Add a new action to the undo/redo stack whenever a change is made
function onInputChange() {
  const action = new Action(/* do function */, /* undo function */);
  undoRedo.add(action);
  updateButtons();
}

// Update the enabled/disabled state of the undo/redo buttons based on the state of the undo/redo stack
function updateButtons() {
  undoBtn.disabled = undoRedo.index < 0;
  redoBtn.disabled = undoRedo.index >= undoRedo.actions.length - 1;
}

// Undo the most recent action when the undo button is clicked
undoBtn.addEventListener('click', () => {
  undoRedo.undo();
  updateButtons();
});

// Redo the most recent undone action when the redo button is clicked
redoBtn.addEventListener('click', () => {
  undoRedo.redo();
  updateButtons();
});

// Example event listeners for input changes that will add new actions to the undo/redo stack
const input1 = document.getElementById('input1');
input1.addEventListener('input', onInputChange);

const input2 = document.getElementById('input2');
input2.addEventListener('input', onInputChange);