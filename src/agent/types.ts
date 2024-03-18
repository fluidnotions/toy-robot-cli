import { Command } from "../control";
import { Position } from "../environment";

export interface Agent {
  getPosition(): Position;
  updatePosition(command: Command, next: Position): void;
  changeDirection(command: Command): void;
  reportPosition(): string;
}
