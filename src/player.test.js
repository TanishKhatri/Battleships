import {Player} from "./player.js";
import Gameboard from "./gameboard.js";

describe("Player class works", () => {
  test("Player Id exists", () => {
    const player = new Player();
    expect(player.id).toBeTruthy();
  });

  test("Player Gameboard exists", () => {
    const player = new Player();
    const gameboard = new Gameboard();
    expect(player.gameboard).toStrictEqual(gameboard);
  });

  describe("Place Ship Input Check Works", () => {
    test("Works When Ship is Out of Bounds in X", () => {
      const player = new Player();
      expect(player.placeShip(-1, 2, 3, true)).toBe("invalidPlacement");
      expect(player.placeShip(8, 2, 3, true)).toBe("invalidPlacement");
      expect(player.placeShip(10, 2, 3, true)).toBe("invalidPlacement");
      expect(player.placeShip(4, 11, 3, true)).toBe("invalidPlacement");
      expect(player.placeShip(4, -1, 3, true)).toBe("invalidPlacement");
    });

    test("Works When Ship is Out of Bounds in Y", () => {
      const player = new Player();
      expect(player.placeShip(2, 8, 5, false)).toBe("invalidPlacement");
      expect(player.placeShip(2, 11, 3, false)).toBe("invalidPlacement");
      expect(player.placeShip(2, -1, 3, false)).toBe("invalidPlacement");
      expect(player.placeShip(-1, 4, 3, false)).toBe("invalidPlacement");
      expect(player.placeShip(11, 5, 3, false)).toBe("invalidPlacement");
    });

    test("Works When A Ship is already there", () => {
      const player = new Player();
      player.placeShip(1, 2, 3, true);
      expect(player.placeShip(1, 2, 3, true)).toBe("invalidPlacement");
      expect(player.placeShip(2, 1, 3, false)).toBe("invalidPlacement");
    });

    test("Does not return InvalidPlacement on valids", () => {
      const player = new Player();
      expect(player.placeShip(1, 2, 3, true)).not.toBe("invalidPlacement");
      expect(player.placeShip(5, 6, 4, false)).not.toBe("invalidPlacement");
    });
  });
});

