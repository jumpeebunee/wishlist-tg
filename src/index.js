import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { START_COMMAND } from "./constants/commands.js";
import { START_MESSAGE } from "./constants/messages.js";
import { checkUserIsAvailable } from "./helpers/auth/index.js";

dotenv.config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

const checkCommand = async (command, chatId, msg) => {
  if (command === START_COMMAND) {
    const data = await checkUserIsAvailable(msg.from.id.toString());
    bot.sendMessage(chatId, `${START_MESSAGE} ${data}`);
  }
};

bot.setMyCommands([{ command: START_COMMAND, description: "Приветствие" }]);

bot.on("message", async (msg) => {
  const message = msg.text;
  const chatId = msg.chat.id;

  await checkCommand(message, chatId, msg);
});
