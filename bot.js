const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Set up Telegram bot
const token = '6385372377:AAGbFg4KnUd9ouCS3WgqkqLAEadDiIisrX4';
const bot = new TelegramBot(token, { polling: true });

// Handle incoming messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Handle different commands
  if (messageText === '/start') {
    bot.sendMessage(chatId, 'Welcome to the CryptoBot! Type /help to see available commands.');
  } else if (messageText === '/help') {
    bot.sendMessage(chatId, 'Available commands:\n/price {symbol} - Get current price of a cryptocurrency\n/list - Get a list of supported cryptocurrencies\n/market - Get overall market statistics\n/top {limit} - Get top N cryptocurrencies by market capitalization\n/info {symbol} - Get information about a specific cryptocurrency\n/history {symbol} {days} - Get historical price data for a cryptocurrency\n/recommend - Get a random cryptocurrency recommendation\n/news - Get the latest news articles about cryptocurrencies');
  } else if (messageText.startsWith('/price ')) {
    // Handle price command
    const symbol = messageText.substring('/price '.length).toUpperCase();
    // Rest of the code for price command
    // ...
  } else if (messageText === '/list') {
    // Handle list command
    // Rest of the code for list command
    // ...
  } else if (messageText === '/market') {
    // Handle market command
    // Rest of the code for market command
    // ...
  } else if (messageText.startsWith('/top ')) {
    // Handle top command
    // Rest of the code for top command
    // ...
  } else if (messageText.startsWith('/info ')) {
    // Handle info command
    // Rest of the code for info command
    // ...
  } else if (messageText.startsWith('/history ')) {
    // Handle history command
    // Rest of the code for history command
    // ...
  } else if (messageText === '/recommend') {
    // Handle recommend command
    // Rest of the code for recommend command
    // ...
  } else if (messageText === '/news') {
    // Handle news command
    // Rest of the code for news command
    // ...
  } else {
    bot.sendMessage(chatId, 'Invalid command. Type /help to see available commands.');
  }
});

// Start the bot
bot.on('polling_error', (error) => {
  console.error(error);
});