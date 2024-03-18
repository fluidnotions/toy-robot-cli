import { Position } from "../environment";

export enum Instruction {
  PLACE = "PLACE",
  MOVE = "MOVE",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  REPORT = "REPORT",
}

export type Command = {
  instruction: Instruction;
  next?: Position;
  degrees?: number;
};

export interface AgentController {
  executeCommand(command: Command): void;
  nextPosition(): Position;
}
