import { Agent } from ".";
import { Command, Instruction } from "../control";
import { Direction, Position } from "../environment";

export class Robot implements Agent {
  private position: Position | null = null;

  updatePosition(command: Command, next: Position): void {
    switch (command.instruction) {
      case Instruction.PLACE:
      case Instruction.MOVE:
        this.position = next!;
        break;
      default:
        throw new Error(
          `Invalid update position command: ${command.instruction}`,
        );
    }
  }

  /**
   * This robot changes its direction by 90 degrees to the left or right.
   * Changes the direction of the robot based on the current direction and instruction.
   * @param currentDirection - The current direction of the robot.
   * @param instruction - The instruction to turn left or right.
   * @returns The new direction of the robot after turning.
   * @throws Error if the current direction is invalid.
   */
  changeDirection(command: Command): Direction {
    if (!this.position) throw new Error("The robot has not been placed yet");
    const { instruction } = command;
    let newDirection: Direction;
    switch (this.position![2]) {
      case Direction.NORTH:
        newDirection =
          instruction === Instruction.RIGHT ? Direction.EAST : Direction.WEST;
        break;
      case Direction.EAST:
        newDirection =
          instruction === Instruction.RIGHT ? Direction.SOUTH : Direction.NORTH;
        break;
      case Direction.SOUTH:
        newDirection =
          instruction === Instruction.RIGHT ? Direction.WEST : Direction.EAST;
        break;
      case Direction.WEST:
        newDirection =
          instruction === Instruction.RIGHT ? Direction.NORTH : Direction.SOUTH;
        break;
      default:
        throw new Error(`Invalid current direction: ${this.position![2]}`);
    }
    this.position![2] = newDirection;
    return newDirection;
  }

  getPosition(): Position {
    if (!this.position) throw new Error("The robot has not been placed yet");
    return this.position;
  }

  reportPosition(): string {
    if (!this.position) throw new Error("The robot has not been placed yet");
    return `x: ${this.position[0]}, y: ${this.position[1]}, facing: ${this.position[2]}`;
  }
}
