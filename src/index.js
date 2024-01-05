import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { START_COMMAND, WISHLIST_COMMAND } from "./constants/commands.js";
import { START_MESSAGE } from "./constants/messages.js";
import { checkUserIsAvailable } from "./helpers/auth/index.js";
import { botCommands } from "./data/botCommands.js";
import { addToWishlist } from "./helpers/add/index.js";
import { getWishlists, formatWishlists } from "./helpers/getWishlist/index.js";
import { editWishlist } from "./helpers/edit/index.js";

dotenv.config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

const wishlistOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Редактировать", callback_data: "edit" },
        { text: "Удалить", callback_data: "delete" },
      ],
    ],
  }),
};

const checkCommand = async (command, chatId, msg) => {
  if (command === START_COMMAND) {
    const data = await checkUserIsAvailable(msg.from.id.toString());
    bot.sendMessage(chatId, `${START_MESSAGE} ${data}`);
  } else if (command === WISHLIST_COMMAND) {
    const data = await getWishlists(chatId);
    const formattedData = formatWishlists(data);

    bot.sendMessage(chatId, formattedData, wishlistOptions);
  } else {
    await addToWishlist(chatId, msg);
  }
};

bot.setMyCommands(botCommands);

bot.on("message", async (msg) => {
  const message = msg.text;
  const chatId = msg.chat.id;

  await checkCommand(message, chatId, msg);
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;

  if (data === "edit") {
    const wishlist = await getWishlists(chatId);
    const mrkp = editWishlist(wishlist);

    bot.editMessageReplyMarkup(mrkp, {
      chat_id: chatId,
      message_id: msg.message.message_id,
    });
  } else if (data === "cancel") {
    bot.editMessageReplyMarkup(wishlistOptions, {
      chat_id: chatId,
      message_id: msg.message.message_id,
    });
  }
});
