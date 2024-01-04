import { doc, setDoc, getDoc } from "firebase/firestore";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { db } from "./firebase.js";
import { START_COMMAND } from "./constants/commands.js";
import { START_MESSAGE } from "./constants/messages.js";

dotenv.config();

var token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

const createUserData = async (id) => {
  const user = {
    wishlists: [],
  };

  const docRef = doc(db, "users", id.toString());
  await setDoc(docRef, user);
};

const checkUserIsAvailable = async (id) => {
  const docRef = doc(db, "users", id.toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return await createUserData(id);
};

bot.setMyCommands([{ command: START_COMMAND, description: "Приветствие" }]);

bot.on("message", async (msg) => {
  const message = msg.text;
  const chatId = msg.chat.id;

  if (message === START_COMMAND) {
    const id = msg.from.id.toString();
    const data = await checkUserIsAvailable(id);

    bot.sendMessage(chatId, `${START_MESSAGE} ${data}`);
  }
});
