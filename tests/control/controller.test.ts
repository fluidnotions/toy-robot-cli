import { describe, expect, it } from "@jest/globals";
import { Agent, Robot } from "../../src/agent";
import { Command, Controller, Instruction } from "../../src/control";
import { Direction, Environment, Square } from "../../src/environment";

describe("Controller", () => {
  let controller: Controller;
  let environment: Environment;
  let agent: Agent;

  describe("before the agent has been placed", () => {
    beforeEach(() => {
      environment = new Square(5);
      agent = new Robot();
      controller = new Controller(environment, agent);
    });

    it("should execute PLACE command and update agent position", () => {
      const command: Command = {
        instruction: Instruction.PLACE,
        next: [1, 2, Direction.NORTH],
      };

      controller.executeCommand(command);

      expect(agent.getPosition()).toEqual([1, 2, Direction.NORTH]);
    });

    it("should not execute PLACE command without next position", () => {
      const command: Command = {
        instruction: Instruction.PLACE,
        next: undefined,
      };

      expect(() => controller.executeCommand(command)).toThrow(
        "The PLACE command must have a next position",
      );
    });
  });

  describe("after the agent has been placed", () => {
    beforeEach(() => {
      environment = new Square(5);
      agent = new Robot();
      controller = new Controller(environment, agent);
      const place: Command = {
        instruction: Instruction.PLACE,
        next: [1, 2, Direction.NORTH],
      };
      controller.executeCommand(place);
    });

    it("should execute MOVE command and update agent position", () => {
      const command: Command = {
        instruction: Instruction.MOVE,
      };

      controller.executeCommand(command);

      expect(agent.getPosition()).toEqual([1, 3, Direction.NORTH]);
    });

    it("should execute RIGHT command and change agent direction", () => {
      const start = agent.reportPosition();
      console.log("starting position: ", start);
      const command: Command = {
        instruction: Instruction.RIGHT,
      };

      controller.executeCommand(command);

      expect(agent.getPosition()).toEqual([1, 2, Direction.EAST]);
    });

    it("should execute LEFT command and change agent direction", () => {
      const start = agent.reportPosition();
      console.log("starting position: ", start);
      const command: Command = {
        instruction: Instruction.LEFT,
      };

      controller.executeCommand(command);

      expect(agent.getPosition()).toEqual([1, 2, Direction.WEST]);
    });
  });
  describe("after the agent has been placed on the edge of the environment", () => {
    beforeEach(() => {
      environment = new Square(5);
      agent = new Robot();
      controller = new Controller(environment, agent);
      const place: Command = {
        instruction: Instruction.PLACE,
        next: [4, 4, Direction.NORTH],
      };
      controller.executeCommand(place);
    });

    it("should execute MOVE command and throw", () => {
      const command: Command = {
        instruction: Instruction.MOVE,
      };

      expect(() => controller.executeCommand(command)).toThrow(
        "The next position 4,5,North is not allowed, within the dimensions 5,5 of the environment (origin 0,0 SW corner).",
      );
    });

    it("should execute LEFT command and MOVE command and change position", () => {
      [
        {
          instruction: Instruction.LEFT,
        },
        {
          instruction: Instruction.MOVE,
        },
      ].forEach((command) => controller.executeCommand(command));

      expect(agent.getPosition()).toEqual([3, 4, Direction.WEST]);
    });

    it("should execute LEFT command, LEFT command and MOVE command and change position", () => {
      [
        {
          instruction: Instruction.LEFT,
        },
        {
          instruction: Instruction.LEFT,
        },
        {
          instruction: Instruction.MOVE,
        },
      ].forEach((command) => controller.executeCommand(command));

      expect(agent.getPosition()).toEqual([4, 3, Direction.SOUTH]);
    });
  });
});
