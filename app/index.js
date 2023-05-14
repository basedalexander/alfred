const registry = require("./commands/command-registry");
const { commandFunctions } = require('./commands/commandFunctions');

commandFunctions.forEach(commandFunction => {
    registry.register(commandFunction);
});
