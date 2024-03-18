import { Position } from "./types";

export abstract class Environment {
  protected dimensions: [number, number];

  constructor(width: number, height: number) {
    this.dimensions = [width, height];
  }

  commandAllowed(next: Position): boolean {
    const valid =
      next[0] >= 0 &&
      next[0] < this.dimensions[0] &&
      next[1] >= 0 &&
      next[1] < this.dimensions[1];
    if (!valid) {
      throw new Error(
        `The next position ${next} is not allowed, within the dimensions ${this.dimensions} of the environment (origin 0,0 SW corner).`,
      );
    }
    return valid;
  }
}
