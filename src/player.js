import Gameboard from "./gameboard.js";

const PLAYER_SHIPS = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 3,
  Patrol: 2,
};
// A BattleShips game has one ship of length 5
// one of 4
// two of size 3
// one of size 2
class Player {
  id;
  gameboard;
  ships;
  constructor() {
    this.id = crypto.randomUUID();
    this.gameboard = new Gameboard();
    this.ships = structuredClone(PLAYER_SHIPS);
  }

  placeShip(x, y, shipSize, isHorizontal) {
    //Check for out of bounds
    if (
      (isHorizontal && (x < 0 || x + shipSize > this.gameboard.xBoardLength)) ||
      y < 0 ||
      y > this.gameboard.yBoardLength - 1
    ) {
      return "invalidPlacement";
    } else if (
      (!isHorizontal &&
        (y < 0 || y + shipSize > this.gameboard.yBoardLength)) ||
      x < 0 ||
      x > this.gameboard.xBoardLength - 1
    ) {
      return "invalidPlacement";
    }

    //Check whether there is a ship already there.
    if (isHorizontal) {
      for (let i = 0; i < shipSize; i++) {
        if (this.gameboard.board[x + i][y] !== null) {
          return "invalidPlacement";
        }
      }
    } else if (!isHorizontal) {
      for (let i = 0; i < shipSize; i++) {
        if (this.gameboard.board[x][y + i] !== null) {
          return "invalidPlacement";
        }
      }
    }
    this.gameboard.placeShip(x, y, shipSize, isHorizontal);
  }
}

class Computer {
  id;
  gameboard;
  ships;
  constructor() {
    this.id = crypto.randomUUID();
    this.gameboard = new Gameboard();
    this.ships = structuredClone(PLAYER_SHIPS);
  }

  placeShipsRandomly() {
    let currShips = structuredClone(this.ships);
    currShips = Object.values(currShips);
    outerloop: while (currShips.length !== 0) {
      const isHorizontalNumber = Math.floor(Math.random() * 2);
      const isHorizontal = Boolean(isHorizontalNumber);
      const shipSize = currShips.pop();

      if (isHorizontal) {
        const x = Math.floor(
          Math.random() * (this.gameboard.xBoardLength - shipSize + 1),
        );
        const y = Math.floor(Math.random() * this.gameboard.yBoardLength);
        for (let i = 0; i < shipSize; i++) {
          if (this.gameboard.board[x + i][y] !== null) {
            currShips.push(shipSize);
            continue outerloop;
          }
        }
        this.gameboard.placeShip(x, y, shipSize, isHorizontal);
      } else if (!isHorizontal) {
        const y = Math.floor(
          Math.random() * (this.gameboard.yBoardLength - shipSize + 1),
        );
        const x = Math.floor(Math.random() * this.gameboard.xBoardLength);
        for (let i = 0; i < shipSize; i++) {
          if (this.gameboard.board[x][y + i] !== null) {
            currShips.push(shipSize);
            continue outerloop;
          }
        }
        this.gameboard.placeShip(x, y, shipSize, isHorizontal);
      }
    }
  }
}

export { Player, Computer };
