let OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAIDatasource(OPENAI_API_KEY);
const createPrompt = require('./create-prompt.func');
const registry = require('../commands/command-registry');

class CommandsCompositor {
    async compose (prompt) {
        const mds = registry.getAllMetadatas();
        const prompt = createPrompt(mds, prompt);
        const commandsCompositions = openai.pr
    }
}

const commandsCompositor = new CommandsCompositor();