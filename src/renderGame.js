import { Player } from "./player.js";
import cannon from "./images/cannon-free-1-svgrepo-com.svg";

const gridLength = 10;

const PLAYER_SHIPS = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 3,
  Patrol: 2,
};

let currentMode = "selectShip";
let currShipLength = 0;
let isShipHorizontal = true;

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

    let cannonList = document.querySelectorAll(".cannonSVG");
    let index = 0;
    function arrowEnterAddFunction(e) {
      if (e.key === "ArrowUp") {
        upArrow.classList.add("activated");
        if (currentMode === "selectShip") {
          if (index === 0) {
            index = cannonList.length - 1;
          } else {
            index--;
          }
          for (let cannon of cannonList) {
            cannon.classList.add("hidden");
          }
          cannonList[index].classList.remove("hidden");
        } else if (currentMode === "placeShip" && isShipHorizontal) {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".cell.selected");

          let selectedRow = parseInt(selected[0].dataset.x);
          if (selectedRow === 0) {
            return;
          }
          cells.forEach((cell) => {
            if (parseInt(cell.dataset.x) === selectedRow - 1) {
              selected.forEach((selected) => {
                if (selected.dataset.y === cell.dataset.y) {
                  cell.classList.add("selected");
                  selected.classList.remove("selected");
                }
              });
            }
          });
        } else if (currentMode === "placeShip" && !isShipHorizontal) {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".cell.selected");

          if (parseInt(selected[0].dataset.x) === 0) {
            return;
          }

          cells.forEach((cell) => {
            if (
              parseInt(cell.dataset.x) >= parseInt(selected[0].dataset.x) - 1 &&
              parseInt(cell.dataset.x) <=
                parseInt(selected[selected.length - 1].dataset.x) - 1 &&
              cell.dataset.y === selected[0].dataset.y
            ) {
              cell.classList.add("selected");
            }
          });

          selected[selected.length - 1].classList.remove("selected");
        }
      } else if (e.key === "ArrowLeft") {
        leftArrow.classList.add("activated");
        if (currentMode === "placeShip" && isShipHorizontal) {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".cell.selected");

          if (parseInt(selected[0].dataset.y) === 0) {
            return;
          }

          cells.forEach((cell) => {
            if (
              parseInt(cell.dataset.y) >= parseInt(selected[0].dataset.y) - 1 &&
              parseInt(cell.dataset.y) <=
                parseInt(selected[selected.length - 1].dataset.y) - 1 &&
              cell.dataset.x === selected[0].dataset.x
            ) {
              cell.classList.add("selected");
            }
          });

          selected[selected.length - 1].classList.remove("selected");
        } else if (currentMode === "placeShip" && !isShipHorizontal) {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".cell.selected");

          let selectedCol = parseInt(selected[0].dataset.y);
          if (selectedCol === 0) {
            return;
          }
          cells.forEach((cell) => {
            if (parseInt(cell.dataset.y) === selectedCol - 1) {
              selected.forEach((selected) => {
                if (selected.dataset.x === cell.dataset.x) {
                  cell.classList.add("selected");
                  selected.classList.remove("selected");
                }
              });
            }
          });
        }
      } else if (e.key === "ArrowDown") {
        downArrow.classList.add("activated");
        if (currentMode === "selectShip") {
          let listLength = cannonList.length - 1;
          if (index === listLength) {
            index = 0;
          } else {
            index++;
          }
          for (let cannon of cannonList) {
            cannon.classList.add("hidden");
          }
          cannonList[index].classList.remove("hidden");
        } else if (currentMode === "placeShip" && isShipHorizontal) {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".cell.selected");

          let selectedRow = parseInt(selected[0].dataset.x);
          if (selectedRow === gridLength - 1) {
            return;
          }
          cells.forEach((cell) => {
            if (parseInt(cell.dataset.x) === selectedRow + 1) {
              selected.forEach((selected) => {
                if (selected.dataset.y === cell.dataset.y) {
                  cell.classList.add("selected");
                  selected.classList.remove("selected");
                }
              });
            }
          });
        } else if (currentMode === "placeShip" && !isShipHorizontal) {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".cell.selected");

          if (
            parseInt(selected[selected.length - 1].dataset.x) ===
            gridLength - 1
          ) {
            return;
          }

          cells.forEach((cell) => {
            if (
              parseInt(cell.dataset.x) >= parseInt(selected[0].dataset.x) + 1 &&
              parseInt(cell.dataset.x) <=
                parseInt(selected[selected.length - 1].dataset.x) + 1 &&
              cell.dataset.y === selected[0].dataset.y
            ) {
              cell.classList.add("selected");
            }
          });

          selected[0].classList.remove("selected");
        }
      } else if (e.key === "ArrowRight") {
        rightArrow.classList.add("activated");
        if (currentMode === "placeShip" && isShipHorizontal) {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".cell.selected");

          if (
            parseInt(selected[selected.length - 1].dataset.y) ===
            gridLength - 1
          ) {
            return;
          }

          cells.forEach((cell) => {
            if (
              parseInt(cell.dataset.y) >= parseInt(selected[0].dataset.y) + 1 &&
              parseInt(cell.dataset.y) <=
                parseInt(selected[selected.length - 1].dataset.y) + 1 &&
              cell.dataset.x === selected[0].dataset.x
            ) {
              cell.classList.add("selected");
            }
          });

          selected[0].classList.remove("selected");
        } else if (currentMode === "placeShip" && !isShipHorizontal) {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".cell.selected");

          let selectedCol = parseInt(selected[0].dataset.y);
          if (selectedCol === gridLength - 1) {
            return;
          }
          cells.forEach((cell) => {
            if (parseInt(cell.dataset.y) === selectedCol + 1) {
              selected.forEach((selected) => {
                if (selected.dataset.x === cell.dataset.x) {
                  cell.classList.add("selected");
                  selected.classList.remove("selected");
                }
              });
            }
          });
        }
      } else if (e.key === "Enter") {
        enterKey.classList.add("activated");
        if (currentMode === "selectShip") {
          const ships = document.querySelectorAll(".gameShip");

          const selectedShip = ships[index];
          const sizeOfSelectedShip = selectedShip.dataset.shipSize;
          currShipLength = parseInt(sizeOfSelectedShip);
          const cells = document.querySelectorAll(".cell");

          for (let i = 0; i < sizeOfSelectedShip; i++) {
            cells[i].classList.add("selected");
          }

          ships[index].remove();
          currentMode = "placeShip";
          cannonList = document.querySelectorAll(".cannonSVG");
          index = 0;
        } else if (currentMode === "placeShip") {
          const selected = document.querySelectorAll(".selected");
          const response = player1.placeShip(
            parseInt(selected[0].dataset.x),
            parseInt(selected[0].dataset.y),
            currShipLength,
            isShipHorizontal,
          );
          if (response === "invalidPlacement") {
            return;
          }

          const board = renderBoard(player1);
          const currentGameBoard = document.querySelector(".gameboard");
          board.classList.add("gameboard");
          currentGameBoard.remove();
          const boardContainer = document.querySelector(
            ".playerBoardContainer",
          );
          boardContainer.appendChild(board);
          currentMode = "selectShip";
          isShipHorizontal = true;

          const ships = document.querySelectorAll(".gameShip");
          if (ships.length === 0) {
            //All Ships are now Placed
            currentMode = "shipsPlaced";
            const pressEnterButton = document.createElement("div");
            pressEnterButton.classList.add("pressEnterButton");
            pressEnterButton.textContent = "Press Enter";
            const shipsContainer = document.querySelector(".shipsContainer");
            shipsContainer.appendChild(pressEnterButton);
          }
        } else if (currentMode === "shipsPlaced") {
          document.removeEventListener("keydown", arrowEnterAddFunction);
          document.removeEventListener("keyup", arrrowEnterRemoveFunction);

          console.log(player1);
        }
      } else if (e.key === "r") {
        rotateR.classList.add("activated");
        if (currentMode === "placeShip") {
          const cells = document.querySelectorAll(".cell");
          const selected = document.querySelectorAll(".selected");

          if (isShipHorizontal) {
            if (currShipLength > gridLength - selected[0].dataset.x) {
              return;
            }
            for (let i = 0; i < selected.length; i++) {
              cells.forEach((cell) => {
                if (
                  parseInt(selected[i].dataset.y) - i ===
                  parseInt(cell.dataset.y)
                ) {
                  if (
                    parseInt(selected[i].dataset.x) + i ===
                    parseInt(cell.dataset.x)
                  ) {
                    selected[i].classList.remove("selected");
                    cell.classList.add("selected");
                  }
                }
              });
            }

            isShipHorizontal = false;
          } else {
            if (currShipLength > gridLength - selected[0].dataset.y) {
              return;
            }
            for (let i = 0; i < selected.length; i++) {
              cells.forEach((cell) => {
                if (
                  parseInt(selected[i].dataset.y) + i ===
                  parseInt(cell.dataset.y)
                ) {
                  if (
                    parseInt(selected[i].dataset.x) - i ===
                    parseInt(cell.dataset.x)
                  ) {
                    selected[i].classList.remove("selected");
                    cell.classList.add("selected");
                  }
                }
              });
            }

            isShipHorizontal = true;
          }
        }
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
    }
  }

  return board;
}

function renderShips() {
  const ships = document.createElement("div");
  ships.classList.add("shipsContainer");

  const carrier = document.createElement("div");
  carrier.classList.add("carrier", "gameShip");
  carrier.dataset.shipSize = PLAYER_SHIPS.Carrier;

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

  const cannonSVG = document.createElement("div");
  cannonSVG.classList.add("cannonSVG");

  const cannonImage = document.createElement("img");
  cannonImage.classList.add("cannonPlaceShips");
  cannonImage.src = cannon;
  cannonSVG.appendChild(cannonImage);

  carrier.appendChild(carrierBody);
  carrier.appendChild(cannonSVG);

  const hiddenCannonSVG = cannonSVG.cloneNode(true);
  hiddenCannonSVG.classList.add("hidden");

  ships.appendChild(carrier);

  const battleship = document.createElement("div");
  battleship.classList.add("battleship", "gameShip");
  battleship.dataset.shipSize = PLAYER_SHIPS.Battleship;

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
  battleship.appendChild(hiddenCannonSVG.cloneNode(true));
  ships.appendChild(battleship);

  const destroyer = document.createElement("div");
  destroyer.classList.add("destroyer", "gameShip");
  destroyer.dataset.shipSize = PLAYER_SHIPS.Destroyer;

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
  destroyer.appendChild(hiddenCannonSVG.cloneNode(true));
  ships.appendChild(destroyer);

  const submarine = document.createElement("div");
  submarine.classList.add("submarine", "gameShip");
  submarine.dataset.shipSize = PLAYER_SHIPS.Submarine;

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
  submarine.appendChild(hiddenCannonSVG.cloneNode(true));
  ships.appendChild(submarine);

  const patrol = document.createElement("div");
  patrol.classList.add("patrol", "gameShip");
  patrol.dataset.shipSize = PLAYER_SHIPS.Patrol;

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
  patrol.appendChild(hiddenCannonSVG.cloneNode(true));
  ships.appendChild(patrol);

  return ships;
}

export default renderGame;
