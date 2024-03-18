import { describe, expect, it } from "@jest/globals";
import { Direction, Square } from "../../src/environment";

describe("Square", () => {
  let environment: Square;

  beforeEach(() => {
    environment = new Square(5);
  });

  it("should allow valid positions", () => {
    expect(environment.commandAllowed([0, 0, Direction.NORTH])).toBe(true);
    expect(environment.commandAllowed([2, 3, Direction.NORTH])).toBe(true);
    expect(environment.commandAllowed([4, 4, Direction.NORTH])).toBe(true);
  });

  it("should throw an error for invalid positions", () => {
    expect(() =>
      environment.commandAllowed([-1, 0, Direction.NORTH]),
    ).toThrow();
    expect(() =>
      environment.commandAllowed([0, -1, Direction.NORTH]),
    ).toThrow();
    expect(() => environment.commandAllowed([5, 0, Direction.NORTH])).toThrow();
    expect(() => environment.commandAllowed([0, 5, Direction.NORTH])).toThrow();
  });
});
