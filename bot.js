#!/usr/bin/env node
console.log("hello js");
// imports
import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
//variables
const bot = new TelegramBot("5517585912:AAHDQ8QfwsjXBuOH20uLodKPbVS3s98zxOc", {
  polling: true,
});
// const start = {
//   command: "start",
//   description: "welcome message",
//   regexp: /\/start/,
// };
const command = [
  {
    command: "start",
    description: "welcome message",
    regexp: /\/start/,
  },
  {
    command: "random",
    description: "random image",
    regexp: /\/random/,
  },
  {
    command: "cat",
    description: "cat image",
    regexp: /\/cat/,
  },
];

const reply = {
  welcome: "hello name 😊",
  random: ["wow", "beautiful weather 🤑", "amazing", "😍"],
  cat: ["meow", "Purrr", "🙀"],
};
//functionality
bot.onText(command[0].regexp, (msg) => {
  const chat_id = msg.chat.id;
  const first_name = msg.from.first_name;
  bot.sendMessage(chat_id, `hello ${first_name}`);
});
bot.onText(command[1].regexp, (msg) => {
  const chat_id = msg.chat.id;
  const random = Math.floor(Math.random() * 100) + 1;
  const photo = `https://picsum.photos/id/${random}/300`;
  const captions = reply.random;
  const text = captions[Math.floor(Math.random() * captions.length)];
  bot.sendPhoto(chat_id, photo, { caption: text });
});
bot.onText(command[2].regexp, (msg) => {
  const chat_id = msg.chat.id;
  const random = Math.floor(Math.random() * 4) + 1;
  const photo = fs.ReadStream(`./img/${random}.jpg`);
  const captions = reply.cat;
  const text = captions[Math.floor(Math.random() * captions.length)];
  bot.sendPhoto(chat_id, photo, { caption: text });
});
bot.setMyCommands(command);
bot.on("polling_error", console.log);
