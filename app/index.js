const { registry } = require("./command-registry");
const { searchPublicationsByString, searchPublicationsByStringMd } = require("./commands/search-publications-by-string.command");

const commands = [
    {
        func: searchPublicationsByString,
        metadata: searchPublicationsByStringMd
    }
]

commands.forEach(c => {
    registry.register(c.func, c.metadata);
});