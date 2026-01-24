import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const DEFAULT_BOARD_LENGTH = 10;

describe("Gameboard class is created succesfully", () => {
  test("Board length is 10x10 by default", () => {
    const gameboard = new Gameboard();
    expect(gameboard.board).toHaveLength(DEFAULT_BOARD_LENGTH);
    gameboard.board.forEach((arr) => {
      expect(arr).toHaveLength(DEFAULT_BOARD_LENGTH);
    });
  });

  test("Board length is as given(For one param)", () => {
    const len = 23;
    const gameboard = new Gameboard(len);
    expect(gameboard.board).toHaveLength(len);
    gameboard.board.forEach((arr) => {
      expect(arr).toHaveLength(len);
    });
  });

  test("Board length is as given(For two params)", () => {
    const lenx = 12;
    const leny = 17;
    const gameboard = new Gameboard(lenx, leny);
    expect(gameboard.board).toHaveLength(lenx);
    gameboard.board.forEach((arr) => {
      expect(arr).toHaveLength(leny);
    });
  });

  test("All squares are null by default", () => {
    const gameboard = new Gameboard();
    gameboard.board.forEach((arr) => {
      arr.forEach((square) => {
        expect(square).toBeNull();
      });
    });
  });
});

describe("placeShip function works as intended", () => {
  test("Ship is placed correctly", () => {
    const gameboard = new Gameboard();
    const supposedShip = new Ship(1);
    gameboard.placeShip(0, 0, 1, true);
    expect(gameboard.board[0][0]).toStrictEqual(supposedShip);
  });

  test("Ship is placed correctly in horizontal direction", () => {
    const gameboard = new Gameboard();
    const supposedShip = new Ship(3);
    gameboard.placeShip(1, 2, 3, true);
    expect(gameboard.board[1][2]).toStrictEqual(supposedShip);
    expect(gameboard.board[2][2]).toStrictEqual(supposedShip);
    expect(gameboard.board[3][2]).toStrictEqual(supposedShip);
  });

  test("Ship is placed correctly in vertical direction", () => {
    const gameboard = new Gameboard();
    const supposedShip = new Ship(3);
    gameboard.placeShip(2, 1, 3, false);
    expect(gameboard.board[2][1]).toStrictEqual(supposedShip);
    expect(gameboard.board[2][2]).toStrictEqual(supposedShip);
    expect(gameboard.board[2][3]).toStrictEqual(supposedShip);
  });
});

describe("recieveAttack function works as intended", () => {
  test("Attack hits", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 2, 3, true);
    const ship = gameboard.board[1][2];
    gameboard.receiveAttack(1,2);
    expect(ship.hits).toBe(1);
    gameboard.receiveAttack(2,2);
    expect(ship.hits).toBe(2);
  });

  test("Attack misses", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 2, 3, true);
    const ship = gameboard.board[1][2];
    gameboard.receiveAttack(2, 5);
    expect(gameboard.board[2][5]).toBe('miss');
    expect(ship.hits).toBe(0);
  });
});
