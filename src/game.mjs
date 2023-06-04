export function setupGame(socket, assignedColor) {

  console.log("Setting up game...." + assignedColor);
  const gameStatus = document.querySelector('.game-status');
  const redChip = document.querySelector('.red-chip');
  const yellowChip = document.querySelector('.yellow-chip');
  const fields = document.querySelectorAll('.game-field');
  const restartButton = document.querySelector('.restartButton');
  const popupContainer = document.querySelector('.popup-container');

  const NUMBER_OF_COLUMNS = 7;
  const NUMBER_OF_ROWS = 6;

  const gameBoard = new Map();

  let color = assignedColor;
  let redTurn = true;
  yellowChip.classList.add('not-active');

  fields.forEach((field, index) => {
    gameBoard.set(index, field)
    field.addEventListener('drop', (event) => {
      event.preventDefault();
      if (redTurn === (color === "red")) {
        addChip(index);
        socket.emit("game message", { content: { type: "turn", info: index }, to: "room1" })
      }
    });
    field.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
  });

  //////////////Socket Events//////////////
  socket.on("user joined", () => {
    //start game
    color = "red";
    gameStatus.innerHTML = "Turn red";
    restartGame();
  });

  socket.on("user left", () => {
    restartGame();
    color = "none";
    gameStatus.innerHTML = "Waiting on new opponent..."
  });

  socket.on("game message", (message) => {
    if (message.from !== socket.id) {
      switch (message.content.type) {
        case ("turn"):
          addChip(message.content.info);
          break;
        case ("restart"):
          if (restartButton.innerHTML === "Restart requested: waiting on opponent...") {
            restartGame();
          } else {
            restartButton.innerHTML = "Restart? Opponent requested rematch";
          }
          break;
        default:
          console.error("Unknown game message type!");
      }
    }

  });

  //TO-DO: remove when router is ready!
  socket.on("leave accept", () => {
    restartGame();
    gameStatus.innerHTML = "Router: game not visible!"
  });


  //////////////End Socket Events//////////////

  function addChip(index) {
    const currentChip = redTurn ? 'red' : 'yellow';
    const column = index % NUMBER_OF_COLUMNS;
    let insertedRow = -1;
    for (let row = NUMBER_OF_ROWS - 1; row >= 0; row--) {
      const field = gameBoard.get(calculateCurrentIndex(row, column));
      if (field.classList.length < 2) {
        field.classList.add(currentChip);
        insertedRow = row;
        break;
      }
    }
    if (insertedRow === -1) {
      return;
    }
    if (checkWin(insertedRow, column) || checkDraw()) {
      showPopup()
      return;
    }
    changeTurn();

  }


  function showPopup() {
    popupContainer.classList.add("setVisible");
    document.querySelector('.winning-message').textContent = getWinningMessage();
    restartButton.addEventListener("click", function () {
      socket.emit("game message", { content: { type: "restart" }, to: "room1" });
      if (restartButton.innerHTML === "Restart") {
        restartButton.innerHTML = "Restart requested: waiting on opponent..."
      } else if (restartButton.innerHTML === "Restart? Opponent requested rematch") {
        restartGame();
      }
    }, { once: true });
  }

  function restartGame() {
    fields.forEach((field) => {
      if (field.classList.length === 2) {
        field.classList.remove('yellow');
        field.classList.remove('red');
      }
      popupContainer.classList.remove('setVisible');
      !redTurn && changeTurn();

    })
  }


  function getWinningMessage() {
    return checkDraw() ?
      'Unentschieden' : redTurn ?
        "Rot hat gewonnen" : "Gelb hat gewonnen";
  }

  function checkWin(row, column) {
    const currentChip = redTurn ? 'red' : 'yellow';
    const directions = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1]
    ];

    for (const [oneRow, oneColumn] of directions) {

      const outerPoint = findOuterPoint(row, column, [-oneRow, -oneColumn]);

      let chipCount = 0;
      let currentRow = outerPoint[0] + oneRow;
      let currentColumn = outerPoint[1] + oneColumn;

      while (currentRow >= 0 && currentRow < NUMBER_OF_ROWS && currentColumn >= 0 && currentColumn < NUMBER_OF_COLUMNS) {
        const field = gameBoard.get(calculateCurrentIndex(currentRow, currentColumn));
        if (field.classList.contains(currentChip)) {
          chipCount++;
          if (chipCount === 4) {
            return true;
          }
        } else {
          chipCount = 0;
        }
        currentRow += oneRow;
        currentColumn += oneColumn;
      }
    }
    return false;
  }

  function findOuterPoint(row, column, [oneRow, oneColumn]) {

    while (row >= 0 && row < NUMBER_OF_ROWS && column >= 0 && column < NUMBER_OF_COLUMNS) {
      row += oneRow;
      column += oneColumn;
    }

    return [row, column];
  }



  function calculateCurrentIndex(row, column) {
    return row * NUMBER_OF_COLUMNS + column;
  }

  function checkDraw() {
    return [...gameBoard.values()].every((field) => field.classList.length === 2);
  }

  function changeTurn() {
    redTurn = !redTurn;
    gameStatus.textContent = redTurn ? "Turn red" : "Turn yellow";

    redChip.draggable = redTurn && (color === "red");
    yellowChip.draggable = !redTurn && (color === "yellow");

    yellowChip.classList.toggle('not-active');
    redChip.classList.toggle('not-active');
  }
}

