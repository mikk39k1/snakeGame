"use strict";

window.addEventListener("load", start);
document.addEventListener("keydown", pressKey);


// ******** CONTROLLER ********

function start() {
  console.log(`Javascript kører`);

  tick();
  
}


function tick() {
  // setup next tick
  setTimeout(tick, 300);

  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col,
  }

  for (const part of queue) {
    writeToCell(part.row, part.col, 0)
  }

 

  switch (direction) {
    case "left":
      head.col --;
      if (head.col < 0) {
        head.col = 9;
      }
      break;
    case "right":
      head.col ++;
      if(head.col > 9) {
        head.col = 0;
      }
      break;
    case "up":
      head.row --;
      if(head.row < 0) {
        head.row = 9;
      }
      break;
    case "down":
      head.row ++;
      if (head.row > 9) {
        head.row = 0;
      }
      break;
  }


  for (const part of queue) {
    writeToCell(part.row, part.col, 1)
  }

  queue.push(head);

  // display the model in full
  displayBoard();
}


// ******** MODEL ********
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];



const queue = [
  {
    row: 5,
    col: 5
  },
  {
    row: 5,
    col: 6
  },
  {
    row: 5,
    col: 7
  }
]




let direction = "left";

function pressKey(event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
}

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// ******** VIEW ********

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}
