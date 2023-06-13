export function setupGame(socket, assignedColor, room) {
  // Reference to HTML elements
  const gameStatus = document.querySelector('.game-status');
  const redChip = document.querySelector('.red-chip');
  const yellowChip = document.querySelector('.yellow-chip');
  const fields = document.querySelectorAll('.game-field');
  const restartButton = document.querySelector('.restartButton');
  const popupContainer = document.querySelector('.popup-container');
  const winnerSound = document.getElementById('winnerSound');

  // Constants for the game
  const NUMBER_OF_COLUMNS = 7;
  const NUMBER_OF_ROWS = 6;

  // Map to assign the index to a field
  const gameBoard = new Map();

  // Set the player's color to either red or yellow
  let color = assignedColor;
  // Red always starts the game, so yellow is set to "not active"
  let redTurn = true;
  yellowChip.classList.add('not-active');

  // Set up the fields, add them to the hashmap, and define the drop event for each field
  fields.forEach((field, index) => {
    gameBoard.set(index, field)
    field.addEventListener('drop', (event) => {
      event.preventDefault();
      if (redTurn === (color === "red")) {
        addChip(index);
        socket.emit("game message", { content: { type: "turn", info: index }, to: room })
      }
    });
    field.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
  });

  ////////////// Socket Events //////////////
  // The first player in the lobby gets the color red
  socket.on("user joined", () => {
    color = "red";
    gameStatus.innerHTML = "Turn: Red";
    restartGame();
  });

  // If a user leaves, their color becomes "none" and the game status shows "Waiting for a new opponent..."
  socket.on("user left", () => {
    restartGame();
    color = "none";
    gameStatus.innerHTML = "Waiting for a new opponent...";
  });

  // Handling player turns and restarts
  socket.on("game message", (message) => {
    if (message.from !== socket.id) {
      switch (message.content.type) {
        case "turn":
          addChip(message.content.info);
          break;
        case "restart":
          if (restartButton.innerHTML === "Restart requested: waiting on opponent...") {
            restartGame();
          } else {
            restartButton.innerHTML = "Restart? Opponent requested a rematch";
          }
          break;
        default:
          console.error("Unknown game message type!");
      }
    }
  });

  ////////////// End of Socket Events //////////////

  // Check from the bottom to the top row if the field is free in that column and add the chip by setting the data attribute as a flag
  function addChip(index) {
    const currentChip = redTurn ? 'red' : 'yellow';
    const column = index % NUMBER_OF_COLUMNS;
    let insertedRow = -1;
    for (let row = NUMBER_OF_ROWS - 1; row >= 0; row--) {
      // Get the field via index
      const field = gameBoard.get(calculateCurrentIndex(row, column));
      // If the field is free, set the data attribute and start the animation
      if (!field.dataset.chip) {
        field.dataset.chip = currentChip;
        animateChipDrop(column, currentChip, row);
        insertedRow = row;
        break;
      }
    }
    // If no free field was found, return
    if (insertedRow === -1) {
      return;
    }
    // Check for winning/draw condition
    if (checkWin(insertedRow, column) || checkDraw()) {
      showPopup();
      if (checkWin(insertedRow, column) && color === currentChip) {
        winnerSound.play();
      }
      return;
    }
    changeTurn();
  }

  function animateChipDrop(column, currentChip, insertedRow) {
    for (let row = 0; row <= insertedRow; row++) {
      setTimeout(() => {
        const field = gameBoard.get(calculateCurrentIndex(row, column));
        field.classList.add(currentChip);

        if (row < insertedRow) {
          setTimeout(() => {
            field.classList.remove(currentChip);
          }, 500);
        }
      }, (row * 100));
    }
  }

  // Show the popup to display the winner and the option to request a rematch or accept a rematch offer
  function showPopup() {
    popupContainer.classList.add("setVisible");
    document.querySelector('.winning-message').textContent = getWinningMessage();
    restartButton.addEventListener("click", function () {
      socket.emit("game message", { content: { type: "restart" }, to: room });
      if (restartButton.innerHTML === "Restart") {
        restartButton.innerHTML = "Restart requested: waiting on opponent...";
      } else if (restartButton.innerHTML === "Restart? Opponent requested a rematch") {
        restartGame();
      }
    }, { once: true });
  }

  // Restart the game
  function restartGame() {
    // Set fields to their original state
    fields.forEach((field) => {
      field.dataset.chip = '';
      field.classList.remove('yellow');
      field.classList.remove('red');
    });
    // Remove the popup
    popupContainer.classList.remove('setVisible');
    // Reset the turn to red
    !redTurn && changeTurn();
    // Reset the winner sound
    winnerSound.pause();
    winnerSound.currentTime = 0;
  }

  // Get the winning message
  function getWinningMessage() {
    return checkDraw() ?
      'Draw' : redTurn ?
        "Red wins" : "Yellow wins";
  }

  // Check for a win by checking the rows, columns, and diagonals
  function checkWin(row, column) {
    const currentChip = redTurn ? 'red' : 'yellow';
    const directions = [
      [1, 0], // Direction from top to bottom
      [0, 1], // Direction from left to right
      [1, 1], // Direction for the first diagonal to bottom right
      [1, -1] // Direction for the second diagonal to bottom left
    ];
      // checks every direction
    for (const [oneRow, oneColumn] of directions) {
      // Get the outer point to check all fields later on
      const outerPoint = findOuterPoint(row, column, [-oneRow, -oneColumn]);
      let chipCount = 0;
      let currentRow = outerPoint[0] + oneRow;
      let currentColumn = outerPoint[1] + oneColumn;

      // Move in the defined direction as long as the control position is within the borders of the game board
      while (currentRow >= 0 && currentRow < NUMBER_OF_ROWS && currentColumn >= 0 && currentColumn < NUMBER_OF_COLUMNS) {
        const field = gameBoard.get(calculateCurrentIndex(currentRow, currentColumn));
        if (field.dataset.chip === currentChip) {
          chipCount++;
          // Chip found, return true if there are 4 in a row
          if (chipCount === 4) {
            return true;
          }
        } else {
          // Reset chipCount if a gap was found
          chipCount = 0;
        }
        currentRow += oneRow;
        currentColumn += oneColumn;
      }
    }
    return false;
  }

  // Find the outermost point in the negative direction to check all fields later
  function findOuterPoint(row, column, [oneRow, oneColumn]) {
    while (row >= 0 && row < NUMBER_OF_ROWS && column >= 0 && column < NUMBER_OF_COLUMNS) {
      row += oneRow;
      column += oneColumn;
    }

    return [row, column];
  }

  // Calculate the index from row and column to get the specific field element from the Map
  function calculateCurrentIndex(row, column) {
    return row * NUMBER_OF_COLUMNS + column;
  }

  // Check if all fields are filled, resulting in a draw
  function checkDraw() {
    return [...gameBoard.values()].every((field) => field.dataset.chip);
  }

  // Change turn and update game status
  function changeTurn() {
    redTurn = !redTurn;
    gameStatus.textContent = redTurn ? "Turn: Red" : "Turn: Yellow";

    redChip.draggable = redTurn && (color === "red");
    yellowChip.draggable = !redTurn && (color === "yellow");

    yellowChip.classList.toggle('not-active');
    redChip.classList.toggle('not-active');
  }
}
