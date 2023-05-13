const registry = require("./commands/command-registry");
const metadatadas = require('./metadatas');
const { commandFunctions: functions } = require('./commands/commandFunctions');

console.log(functions);

metadatadas.forEach(md => {
    const foundFunc = functions.find(f => f.name === md.name);
    if (!foundFunc) {
        console.warn(`function for command ${md.name} was not found`);
    } else {
        registry.register(foundFunc, md);
    }
});
