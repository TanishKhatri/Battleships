import Gameboard from "./gameboard.js";
const DEFAULT_BOARD_LENGTH = 10;

describe('Gameboard class is created succesfully', () => {
  test('Board length is 10x10 by default', () => {
    const gameboard = new Gameboard();
    expect(gameboard.board).toHaveLength(DEFAULT_BOARD_LENGTH);
    gameboard.board.forEach((arr) => {
      expect(arr).toHaveLength(DEFAULT_BOARD_LENGTH);
    });
  });

  test('Board length is as given(For one param)', () => {
    const len = 23;
    const gameboard = new Gameboard(len);
    expect(gameboard.board).toHaveLength(len);
    gameboard.board.forEach((arr) => {
      expect(arr).toHaveLength(len);
    });
  });

  test('Board length is as given(For two params)', () => {
    const lenx = 12;
    const leny = 17;
    const gameboard = new Gameboard(lenx, leny);
    expect(gameboard.board).toHaveLength(lenx);
    gameboard.board.forEach((arr) => {
      expect(arr).toHaveLength(leny);
    });
  });

  test('All squares are null by default', () => {
    const gameboard = new Gameboard();
    gameboard.board.forEach((arr) => {
      arr.forEach((square) => {
        expect(square).toBeNull();
      });
    });
  });
});