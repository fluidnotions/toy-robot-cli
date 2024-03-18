import { Environment } from "./environment";

export class Square extends Environment {
  constructor(width: number = 5) {
    super(width, width);
  }
}
