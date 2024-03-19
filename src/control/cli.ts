import { input } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";
import { AgentController, Command, Instruction } from "./types";
import { Direction } from "../environment";

export class Cli {
  static async showOps(controller: AgentController) {
    const rangeSpecificsStr = `within the range: x: 0 to ${controller.getEnvironmentDimensions()[0]} and y: 0 to ${controller.getEnvironmentDimensions()[1]}`;
    const operation = await select({
      message: "Select operation",
      choices: [
        {
          name: "Place",
          value: Instruction.PLACE,
        },
        {
          name: "Move",
          value: Instruction.MOVE,
        },
        {
          name: "Left",
          value: Instruction.LEFT,
        },
        {
          name: "Right",
          value: Instruction.RIGHT,
        },
        {
          name: "Report",
          value: Instruction.REPORT,
        },
      ],
    });
    let command: Command;
    switch (operation) {
      case Instruction.PLACE:
        const place = await input({
          message: `Enter: x, y (coordinates separated by comma; ${rangeSpecificsStr})`,
          validate: (input) => {
            const inputParts: number[] = input
              .split(",")
              .map((part) => Number(part.trim()));
            if (inputParts.length !== 2) {
              return "Invalid input. Should be 2 comma separated numbers.";
            }
            if (
              inputParts.some((part) => {
                const result = isNaN(part) || part < 0 || part > 4;
                return result;
              })
            ) {
              return `Invalid input. Should be 2 comma separated integers ${rangeSpecificsStr}`;
            }
            return true;
          },
        });
        const direction = await select({
          message: "Select direction",
          choices: [
            {
              name: "North",
              value: Direction.NORTH,
            },
            {
              name: "East",
              value: Direction.EAST,
            },
            {
              name: "South",
              value: Direction.SOUTH,
            },
            {
              name: "West",
              value: Direction.WEST,
            },
          ],
        });
        const [x, y] = place.split(",").map((part) => Number(part.trim()));
        command = {
          instruction: Instruction.PLACE,
          next: [x, y, direction],
        };
        console.log("Output: placing at: ", command.next);
        break;
      case Instruction.MOVE:
        command = { instruction: Instruction.MOVE };
        break;
      case Instruction.LEFT:
        command = { instruction: Instruction.LEFT };
        break;
      case Instruction.RIGHT:
        command = { instruction: Instruction.RIGHT };
        break;
      case Instruction.REPORT:
        command = { instruction: Instruction.REPORT };
        break;
    }
    try {
      const result = controller.executeCommand(command);
      if (!!result) {
        console.log("Output: ", result);
      }
    } catch (e: any) {
      console.error("Output: ", e.message);
    } finally {
      await Cli.showOps(controller);
    }
  }
}
