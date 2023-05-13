const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('../app/index');
const registry = require('../app/commands/command-registry');
const { createPrompt } = require('../app/commands-compositor/create-prompt.func');
const OpenAIDatasource = require('../app/commands-compositor/open-ai-service');
const CommandExecutor = require('../app/commands-executor/command-executor');

const executor = new CommandExecutor();
const app = express();
app.use(express.urlencoded({extended:true}));

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
  const chatId = msg.chat.id;
  console.log(`received message from chatid ${chatId}`);

  const text = msg.text;
  if (!text) {
    bot.sendMessage(chatId, 'unsupported format from telegram');
    return;
  }

  try {
    await handleTelegramMessage(msg);
  } catch (e) {
    replyError(msg.chat.id, e);
    return;
  }
});

async function handleTelegramMessage (msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log(`chatId: ${chatId}, prompt: ${text}`);

  // 1. Get all commands mds
  const allMds = registry.getAllMetadatas();
  // 2. Contruct a prompt to get instructions
  const prompt = createPrompt(allMds, text);
  // 3. Get instructions
  const instructions = await commandsInstructionsComposer.ask(prompt);
  // 4. Pass instructions to the executor
  let execResult = await executor.execute(instructions);
  // 5. Return result;
  const result = execResult;
  bot.sendMessage(chatId, `${result}`);
}

function replyError(chatId, err) {
  bot.sendMessage(chatId, `error occured: ${err}`);
}