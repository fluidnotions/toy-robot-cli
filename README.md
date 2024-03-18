# toy-robot-cli

This is a command-line interface (CLI) application for a toy robot simulation.

## Scripts

- `start`: Runs the cli, it will guide you through usage and provide feedback.
- `test`: Runs the Jest test suite.
- `run-test-data`: Executes the test file `commands-executor.test.ts` located in the `tests/commands-executor` directory. This test file reads and parses the `commands.txt` file, executes each command, collects output strings, and logs them at the end.

## How to Run

To run the scripts, you need to have Node.js and npm installed on your machine. Follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd yum-toy-robot-cli`
3. Install dependencies: `npm install`
4. Run a script using `npm run <script-name>`. For example, to start the application, run `npm run start`.
