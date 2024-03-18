import { describe, expect, it } from "@jest/globals";
import { Robot } from "../../src/agent";
import { Command, Instruction } from "../../src/control";
import { Direction, Position } from "../../src/environment";

describe("Robot", () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  describe("updatePosition", () => {
    it("should update the position when the command is PLACE or MOVE", () => {
      const command: Command = {
        instruction: Instruction.PLACE,
        next: [0, 0, Direction.NORTH],
      };
      const next: Position = [1, 1, Direction.EAST];
      robot.updatePosition(command, next);
      expect(robot.getPosition()).toEqual(next);
    });

    it("should throw an error for invalid update position command", () => {
      const command: Command = { instruction: Instruction.REPORT };
      const next: Position = [1, 1, Direction.EAST];
      expect(() => robot.updatePosition(command, next)).toThrow(
        "Invalid update position command: REPORT",
      );
    });
  });

  describe("changeDirection", () => {
    beforeEach(() => {
      const command: Command = {
        instruction: Instruction.PLACE,
        next: [0, 0, Direction.NORTH],
      };
      const next: Position = [0, 0, Direction.NORTH];
      robot.updatePosition(command, next);
    });

    it("should change the direction to EAST when turning RIGHT from NORTH", () => {
      const command: Command = { instruction: Instruction.RIGHT };
      expect(robot.changeDirection(command)).toBe(Direction.EAST);
    });

    it("should change the direction to WEST when turning LEFT from NORTH", () => {
      const command: Command = { instruction: Instruction.LEFT };
      expect(robot.changeDirection(command)).toBe(Direction.WEST);
    });
  });

  describe("position", () => {
    it("should throw an error if the robot has not been placed yet", () => {
      expect(() => robot.getPosition()).toThrow(
        "The robot has not been placed yet",
      );
    });
    it("should throw an error if the robot has not been placed yet", () => {
      expect(() => robot.reportPosition()).toThrow(
        "The robot has not been placed yet",
      );
    });
  });
});
