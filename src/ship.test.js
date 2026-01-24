import Ship from "./ship.js";

test("Ship is created with correct length", () => {
  const ship = new Ship(6);
  expect(ship.length).toBe(6);
});

test("Ship is created with correct hits", () => {
  const ship = new Ship(3);
  expect(ship.hits).toBe(0);
});

test("Hit function changes hits correctly", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("Hit function changes hits correctly", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("Hits dont overflow after ship is sunk", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(3);
  ship.hit();
  expect(ship.hits).toBe(3);
});

test("isSunk function is correct", () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
