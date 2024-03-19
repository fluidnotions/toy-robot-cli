import { Agent } from "../agent";
import { Direction, Environment, Position } from "../environment";
import { AgentController, Command, Instruction } from "./types";
import { readFileSync } from "fs";

export class Controller implements AgentController {
  constructor(
    private environment: Environment,
    private agent: Agent,
  ) {}

  getEnvironmentDimensions(): [number, number] {
    return this.environment.getDimensions();
  }

  executeCommand(command: Command): string | void {
    const { instruction, next } = command;
    switch (instruction) {
      case Instruction.PLACE:
        if (!next)
          throw new Error("The PLACE command must have a next position");
        if (this.environment.commandAllowed(next)) {
          this.agent.updatePosition(command, next);
        }
        break;
      case Instruction.MOVE:
        const nextPosition = this.nextPosition();
        if (this.environment.commandAllowed(nextPosition)) {
          this.agent.updatePosition(command, nextPosition);
        }
        break;
      case Instruction.LEFT:
      case Instruction.RIGHT:
        this.agent.changeDirection(command);
        break;
      case Instruction.REPORT:
        return this.agent.reportPosition();
      default:
        throw new Error(`Invalid command instruction: ${instruction}`);
    }
  }

  nextPosition(): Position {
    const [x, y, direction] = this.agent.getPosition();
    if (direction == Direction.NORTH) {
      return [x, y + 1, direction];
    } else if (direction == Direction.EAST) {
      return [x + 1, y, direction];
    } else if (direction == Direction.SOUTH) {
      return [x, y - 1, direction];
    } else if (direction == Direction.WEST) {
      return [x - 1, y, direction];
    }
    return [x, y, direction];
  }

  inputExecutor(filePath: string): string {
    const fileContent = readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n");
    const commandStrings = lines.filter((line) => line.trim() !== "");
    const commands = commandStrings.map((commandString) => {
      const [instruction, next] = commandString.split(" ");
      if (instruction === "PLACE") {
        const [x, y, direction] = next.split(",");
        return {
          instruction: Instruction.PLACE,
          next: [parseInt(x), parseInt(y), direction as Direction],
        };
      }
      return {
        instruction: Instruction[instruction as keyof typeof Instruction],
      };
    });
    const outputs: string[] = [];
    commands
      .map((c) => c as Command)
      .forEach((command: Command) => {
        try {
          const out = this.executeCommand(command);
          !!out && outputs.push(out);
        } catch (e: any) {
          outputs.push(e.message);
        }
      });
    return outputs.join("\n");
  }
}
