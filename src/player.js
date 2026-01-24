import Gameboard from "./gameboard.js";

class Player {
  id;
  gameboard;

  constructor() {
    this.id = crypto.randomUUID();
    this.gameboard = new Gameboard();
  }
}

export default Player;
