const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const path = require('path'); // <-- Add this line

dotenv.config();
const token = process.env.TELEGRAM_ACCESS_TOKEN;

if (!token) {
  console.error('TELEGRAM_ACCESS_TOKEN is not set in .env');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

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

console.log('Bot is running...');