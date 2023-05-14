const registry = require("../commands/command-registry");

class CommandExecutor {
    // @instruction: array of 
    async execute(instruction) {
        // 1. get function which is query.type
        const func = await registry.getFuncByName(instruction.name);
        // 2. execute it with args 
        const execResult = await func(instruction.args);
        const result = execResult;
        return result;
    }

    async executeMany(instructions) {

    }
}

module.exports = CommandExecutor;