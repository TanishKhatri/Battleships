import Ship from "./ship.js";
const DEFAULT_BOARD_LENGTH = 10;

class Gameboard {
  board;
  xBoardLength;
  yBoardLength;

  constructor(xBoardLength = DEFAULT_BOARD_LENGTH, yBoardLength = xBoardLength) {
    this.board = new Array(xBoardLength).fill(new Array(yBoardLength).fill(null));
    this.xBoardLength = xBoardLength;
    this.yBoardLength = yBoardLength;
  }

  //Is Horizontal is either true or false, if it's false assume it to be vertical
  //Ship goes left to right top to bottom
  placeShip(x, y, shipSize, isHorizontal) {
    const ship = new Ship(shipSize);
    if (isHorizontal) {
      for (let i = x; i < shipSize; i++) {
        this.board[i][y] = ship;
      }
    } else {
      for (let i = y; i < shipSize; i++) {
        this.board[x][i] = ship;
      }
    }
  }
}

export default Gameboard;