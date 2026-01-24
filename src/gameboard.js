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
}

export default Gameboard;