import Ship from "./ship.js";
const DEFAULT_BOARD_LENGTH = 10;

class Gameboard {
  board;
  xBoardLength;
  yBoardLength;
  shipsOnBoard;

  constructor(
    xBoardLength = DEFAULT_BOARD_LENGTH,
    yBoardLength = xBoardLength,
  ) {
    this.board = Array.from({ length: xBoardLength }, () =>
      Array.from({ length: yBoardLength }, () => null),
    );
    this.xBoardLength = xBoardLength;
    this.yBoardLength = yBoardLength;
    this.shipsOnBoard = 0;
  }

  //Is Horizontal is either true or false, if it's false assume it to be vertical
  //Ship goes left to right top to bottom
  placeShip(x, y, shipSize, isHorizontal) {
    const ship = new Ship(shipSize);
    if (isHorizontal) {
      for (let i = y; i < y + shipSize; i++) {
        this.board[x][i] = ship;
      }
    } else {
      for (let i = x; i < x + shipSize; i++) {
        this.board[i][y] = ship;
      }
    }
    this.shipsOnBoard++;
  }

  receiveAttack(x, y) {
    const attack = this.board[x][y];
    if (attack === null) {
      this.board[x][y] = "miss";
      return false;
    }

    const ship = this.board[x][y];
    ship.hit();
    if (ship.isSunk()) {
      this.shipsOnBoard--;
    }
    return true;
  }

  allSunk() {
    if (this.shipsOnBoard === 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default Gameboard;
