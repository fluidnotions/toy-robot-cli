import { describe, it } from "@jest/globals";
import { Agent, Robot } from "../../src/agent";
import { Command, Controller, Instruction } from "../../src/control";
import { Direction, Environment, Square } from "../../src/environment";
import { readFileSync } from "fs";
import { join } from "path";

describe("Commands Executor", () => {
  let controller: Controller;
  let environment: Environment;
  let agent: Agent;

  beforeEach(() => {
    environment = new Square(5);
    agent = new Robot();
    controller = new Controller(environment, agent);
  });

  it("should read and parse commands.txt, execute each command collect output strings and log at the end", () => {
    const filePath = join(__dirname, "..", "__data__", "commands.txt");
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
    commands.forEach((command) => {
      try {
        const out = controller.executeCommand(command as Command);
        !!out && outputs.push(out);
      } catch (e: any) {
        outputs.push(e.message);
      }
    });
    console.log(outputs.join("\n"));
  });
});
