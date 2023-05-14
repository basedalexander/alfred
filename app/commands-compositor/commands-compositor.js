const OpenAIDatasource = require('./open-ai-service');

let OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAIDatasource(OPENAI_API_KEY);
const createPrompt = require('./create-prompt.func');

class InstuctionComposer {
    async compose (prompt) {
        const newPrompt = createPrompt(prompt);
        const instruction = await openai.ask(newPrompt);

        const processed = instruction.replace(/Response:/i, "")
        const res = JSON.parse(processed);

        return res;
    }
}

module.exports = InstuctionComposer;