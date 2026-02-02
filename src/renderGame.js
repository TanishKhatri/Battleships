import { Player } from "./player.js";

const PLAYER_SHIPS = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 3,
  Patrol: 2
} 

function renderGame(mode) {
  if (mode === "1player") {
    const titleScreen = document.querySelector(".titleScreenContainer");
    if (titleScreen) {
      titleScreen.remove();
    }

    const placeShipsContainer = document.createElement("div");
    placeShipsContainer.classList.add("placeShipsContainer");

    const boardsContainer = document.createElement("div");
    boardsContainer.classList.add("shipPlacementContainer");

    const h1 = document.createElement("h1");
    h1.classList.add("placeShipsTitle");
    h1.textContent = "Place Your Ships!";

    const player1 = new Player();
    const playerBoardContainer = document.createElement("div");
    playerBoardContainer.classList.add("playerBoardContainer");
    const boardOfPlayer1 = renderBoard(player1);
    playerBoardContainer.appendChild(boardOfPlayer1);

    const ships = renderShips();

    boardsContainer.append(playerBoardContainer, ships);

    placeShipsContainer.appendChild(h1);
    placeShipsContainer.appendChild(boardsContainer);

    const controlsTemp = document.querySelector(".controlTemplate");
    const controls = document.importNode(controlsTemp.content, true);

    const body = document.querySelector("body");
    body.appendChild(placeShipsContainer);

    body.appendChild(controls);

    const upArrow = document.querySelector(".upArrow");
    const leftArrow = document.querySelector(".leftArrow");
    const downArrow = document.querySelector(".downArrow");
    const rightArrow = document.querySelector(".rightArrow");
    const enterKey = document.querySelector(".enterKey");
    const rotateR = document.querySelector(".rotate");

    function arrowEnterAddFunction(e) {
      if (e.key === "ArrowUp") {
        upArrow.classList.add("activated");
      } else if (e.key === "ArrowLeft") {
        leftArrow.classList.add("activated");
      } else if (e.key === "ArrowDown") {
        downArrow.classList.add("activated");;
      } else if (e.key === "ArrowRight") {
        rightArrow.classList.add("activated");
      } else if (e.key === "Enter") {
        enterKey.classList.add("activated");
      } else if (e.key === "r") {
        rotateR.classList.add("activated");
      }
    }

    
    function arrrowEnterRemoveFunction(e) {
      if (e.key === "ArrowUp") {
        upArrow.classList.remove("activated");
      } else if (e.key === "ArrowLeft") {
        leftArrow.classList.remove("activated");
      } else if (e.key === "ArrowDown") {
        downArrow.classList.remove("activated");
      } else if (e.key === "ArrowRight") {
        rightArrow.classList.remove("activated");
      } else if (e.key === "Enter") {
        enterKey.classList.remove("activated");
      } else if (e.key === "r") {
        rotateR.classList.remove("activated");
      }
    }

    document.addEventListener("keydown", arrowEnterAddFunction);
    document.addEventListener("keyup", arrrowEnterRemoveFunction);
  }
}

function renderBoard(player1) {
  const board = document.createElement("div");
  board.classList.add("gameboard");

  const cellList = [];
  for (let i = 0; i < player1.gameboard.xBoardLength; i++) {
    for (let j = 0; j < player1.gameboard.yBoardLength; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = i;
      cell.dataset.y = j;

      if (player1.gameboard.board[i][j] === null) {
        board.appendChild(cell);
      } else {
        cell.classList.add("hasShip");
        board.appendChild(cell);
      }
      cellList.push(cell);
    }
  }

  return board;
}

function renderShips() {
  const ships = document.createElement("div");
  ships.classList.add("shipsContainer");

  const carrier = document.createElement("div");
  carrier.classList.add("carrier");

  const carrierText = document.createElement("p");
  carrierText.classList.add("carrierText");
  carrierText.textContent = "Carrier";
  carrier.appendChild(carrierText);

  const carrierBody = document.createElement("div");
  carrierBody.classList.add("carrierBody");

  for (let i = 0; i < PLAYER_SHIPS.Carrier; i++) {
    const carrierCell = document.createElement("div");
    carrierCell.classList.add("carrierCell");
    carrierBody.appendChild(carrierCell);
  }
  carrier.appendChild(carrierBody);

  ships.appendChild(carrier);

  const battleship = document.createElement("div");
  battleship.classList.add("battleship");

  const battleshipText = document.createElement("p");
  battleshipText.classList.add("battleshipText");
  battleshipText.textContent = "Battleship";
  battleship.appendChild(battleshipText);

  const battleshipBody = document.createElement("div");
  battleshipBody.classList.add("battleshipBody");
  for (let i = 0; i < PLAYER_SHIPS.Battleship; i++) {
    const battleshipCell = document.createElement("div");
    battleshipCell.classList.add("battleshipCell");
    battleshipBody.appendChild(battleshipCell);
  }
  battleship.appendChild(battleshipBody);
  ships.appendChild(battleship);

  const destroyer =  document.createElement("div");
  destroyer.classList.add("destroyer");

  const destroyerText = document.createElement("p");
  destroyerText.classList.add("destroyerText");
  destroyerText.textContent = "Destroyer";
  destroyer.appendChild(destroyerText);
  
  const destroyerBody = document.createElement("div");
  destroyerBody.classList.add("destroyerBody");
  for (let i = 0; i < PLAYER_SHIPS.Destroyer; i++) {
    const destroyerCell = document.createElement("div");
    destroyerCell.classList.add("destroyerCell");
    destroyerBody.appendChild(destroyerCell);
  }
  destroyer.appendChild(destroyerBody);
  ships.appendChild(destroyer);

  const submarine = document.createElement("div");
  submarine.classList.add("submarine");

  const submarineText = document.createElement("p");
  submarineText.classList.add("submarineText");
  submarineText.textContent = "Submarine";
  submarine.appendChild(submarineText);
  
  const submarineBody = document.createElement("div");
  submarineBody.classList.add("submarineBody");
  for (let i = 0; i < PLAYER_SHIPS.Submarine; i++) {
    const submarineCell = document.createElement("div");
    submarineCell.classList.add("submarineCell");
    submarineBody.appendChild(submarineCell);
  }
  submarine.appendChild(submarineBody);
  ships.appendChild(submarine);

  const patrol = document.createElement("div");
  patrol.classList.add("patrol");

  const patrolText = document.createElement("p");
  patrolText.classList.add("patrolText");
  patrolText.textContent = "Patrol";
  patrol.appendChild(patrolText);

  const patrolBody = document.createElement("div");
  patrolBody.classList.add("patrolBody");
  for (let i = 0; i < PLAYER_SHIPS.Patrol; i++) {
    const patrolCell = document.createElement("div");
    patrolCell.classList.add("patrolCell");
    patrolBody.appendChild(patrolCell);
  }
  patrol.appendChild(patrolBody);
  ships.appendChild(patrol);

  return ships;
}

export default renderGame;