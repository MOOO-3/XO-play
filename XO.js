const boardElement = document.getElementById("board");
const resetButton = document.getElementById("reset");
const messageElement = document.getElementById("message");
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "X";
let gameover = false;
let playingComputer = false;

function printBoard() {
  boardElement.innerHTML = "";
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = cell;
      cellElement.onclick = () => handleClick(rowIndex, colIndex);
      boardElement.appendChild(cellElement);
    });
  });
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      board[(a / 3) | 0][a % 3] &&
      board[(a / 3) | 0][a % 3] === board[(b / 3) | 0][b % 3] &&
      board[(a / 3) | 0][a % 3] === board[(c / 3) | 0][c % 3]
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return board.every((row) => row.every((cell) => cell));
}

function checkGameState() {
  printBoard();
  if (checkWinner()) {
    messageElement.textContent = `${currentPlayer} wins!`;
    gameover = true;
  } else if (checkTie()) {
    messageElement.textContent = "It's a tie!";
    gameover = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function handleClick(row, col) {
  if (gameover || board[row][col]) return;

  board[row][col] = currentPlayer;
  checkGameState();

  if (playingComputer && currentPlayer === "O" && !gameover) {
    let emptyCells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          emptyCells.push([i, j]);
        }
      }
    }
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell[0]][randomCell[1]] = currentPlayer;
    checkGameState();
  }
}

resetButton.addEventListener("click", () => {
  playingComputer = false;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer = "X";
  gameover = false;
  messageElement.textContent = "";
  printBoard();
});

computer.addEventListener("click", () => {
  playingComputer = true;
  console.log("Computer is playing " + playingComputer);
});

printBoard();
