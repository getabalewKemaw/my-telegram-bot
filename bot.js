const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config();

const token = process.env.TELEGRAM_ACCESS_TOKEN;
if (!token) {
  console.error('TELEGRAM_ACCESS_TOKEN is not set in .env');
  process.exit(1);
}

// Setup Express web server
const app = express();
const port = process.env.PORT || 3000;

// This URL will be your webhook endpoint
const WEBHOOK_URL = process.env.WEBHOOK_URL; // You will set this on Render

const bot = new TelegramBot(token, { webHook: true });

// Set the bot webhook to your Render public URL
bot.setWebHook(`${WEBHOOK_URL}/bot${token}`);

// Handle webhook requests
app.use(express.json());
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Your "/start" command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const photoPath = path.join(__dirname, 'GetabalewKemaw.jpg');
  bot.sendPhoto(chatId, photoPath, {
    caption: 'Hello there! 👋\n\nYou can contact us using this bot.'
  }).catch(err => {
    console.error('Failed to send photo:', err.message);
    bot.sendMessage(chatId, 'Welcome! (Photo not found)');
  });
  console.log('Start command received');
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});