const registry = require("./command-registry");
const searchPublicationsByStringRegistryData = require("./commands/search-publications-by-string.command");

const commands = [
    {
        func: searchPublicationsByStringRegistryData.func,
        metadata: searchPublicationsByStringRegistryData.metadata
    }
]

commands.forEach(c => {
    registry.register(c.func, c.metadata);
});