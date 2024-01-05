import { START_COMMAND, WISHLIST_COMMAND } from "../constants/commands.js";

export const botCommands = [
  { command: START_COMMAND, description: "Запуск/перезапуск бота" },
  { command: WISHLIST_COMMAND, description: "Показать свой вишлист" },
];
