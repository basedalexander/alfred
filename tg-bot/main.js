const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
require('../app/index');
const registry = require('../app/commands/command-registry');
const { createPrompt } = require('../app/commands-compositor/create-prompt.func');
const OpenAIDatasource = require('../app/commands-compositor/open-ai-service');

let OPENAI_API_KEY = process.env.OPENAI_API_KEY;
let TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (process.env.mode || process.env.MODE === 'dev') {
  const devConfig = require('../config.dev.json');
  TELEGRAM_BOT_TOKEN = devConfig.TELEGRAM_BOT_TOKEN;
  OPENAI_API_KEY = devConfig.OPENAI_API_KEY;
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {polling: true});
const commandsInstructionsComposer = new OpenAIDatasource(OPENAI_API_KEY)

bot.on('message', async (msg) => {
  try {
    await handleTelegramMessage(msg);
  } catch (e) {
    replyError(msg.chat.id, e);
    return;
  }
});

async function handleTelegramMessage (msg) {
  const chatId = msg.chat.id;
  console.log(`received message from chatid ${chatId}`);

  const text = msg.text;
  if (!text) {
    bot.sendMessage(chatId, 'unsupported format from telegram');
    return;
  }

  console.log(`chatId: ${chatId}, prompt: ${text}`);
  let execResult = 'execution result';

  // 1. Get user input and construct a prompt for 
  const allMds = registry.getAllMetadatas();
  const prompt = createPrompt(allMds, text);
  console.log(prompt);
  const instructions = await commandsInstructionsComposer.ask(prompt);
  execResult = instructions; // await commandsExecutor.execute(instructions);
  const result = execResult;
  

  bot.sendMessage(chatId, `${result}`);
}

function replyError(chatId, err) {
  bot.sendMessage(chatId, `error occured: ${err}`);
}

app.get('/ping', async (req, res) => {
  res.send('pong');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});