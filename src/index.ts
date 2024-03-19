import { Controller } from "./control";
import { Square } from "./environment";
import { Robot } from "./agent";
import { Cli } from "./control";

(async () => {
  const controller = new Controller(new Square(5), new Robot());
  await Cli.showOps(controller);
})();
