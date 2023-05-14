const OpenAIDatasource = require('./open-ai-service');

let OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAIDatasource(OPENAI_API_KEY);
const createPrompt = require('./create-prompt.func');
const registry = require('../commands/command-registry');

class CommandsCompositor {
    async compose (prompt) {
        const prompt = createPrompt(prompt);
        const instruction = openai.ask(prompt);
        return instruction;
    }
}

const commandsCompositor = new CommandsCompositor();