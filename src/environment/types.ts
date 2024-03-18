/**
 * Represents the position of an object in a 2D grid.
 * @typedef {Array} Position
 * @property {number} 0 - The x-coordinate of the position.
 * @property {number} 1 - The y-coordinate of the position.
 * @property {Direction} 2 - The direction the object is facing.
 */
export type Position = [number, number, Direction];

/**
 * Represents the possible directions that the agent is facing
 * in the context of the environment.
 */
export enum Direction {
  NORTH = "North",
  EAST = "East",
  SOUTH = "South",
  WEST = "West",
}
