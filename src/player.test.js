import Player from "./player.js";
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
});
