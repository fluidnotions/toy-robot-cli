import { Agent } from "../agent";
import { Direction, Environment, Position } from "../environment";
import { AgentController, Command, Instruction } from "./types";

export class Controller implements AgentController {
  constructor(
    private environment: Environment,
    private agent: Agent,
  ) {}

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
}
