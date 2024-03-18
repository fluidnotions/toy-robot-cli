import { input } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";
import { Command, Controller, Instruction } from "./control";
import { Direction, Square } from "./environment";
import { Robot } from "./agent";

(async () => {
  const controller = new Controller(new Square(5), new Robot());
  const cli = async () => {
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
          message:
            "Enter: x, y (coordinates separated by comma; within the range 0 to 4)",
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
              return "Invalid input. Should be 2 comma separated integers within the range 0 to 4.";
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
        console.log("Feedback: placing at: ", command.next);
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
      if (result) {
        console.log("Feedback: ", result);
      }
    } catch (e: any) {
      console.error("Feedback: ", e.message);
    } finally {
      await cli();
    }
  };
  await cli();
})();
