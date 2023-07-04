const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const botToken = '6284663701:AAHLl1qo6PvO7QDmOX_gskLNOqrcWp7BkE0';
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the GeniusCryptoBot! Type /help to see available commands.');
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `Available commands:
/price {symbol} - Get current price of a cryptocurrency
/market - Get overall market statistics
/top {limit} - Get top N cryptocurrencies by market capitalization
/info {symbol} - Get information about a specific cryptocurrency
/history {symbol} {days} - Get historical price data for a cryptocurrency
/recommend - Get a random cryptocurrency recommendation
/news - Get the latest news articles about cryptocurrencies`;
  bot.sendMessage(chatId, helpMessage);
});

bot.onText(/\/price (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const symbol = match[1];
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
    const price = response.data[symbol].usd;
    bot.sendMessage(chatId, `Current price of ${symbol}: $${price}`);
  } catch (error) {
    bot.sendMessage(chatId, 'Failed to fetch cryptocurrency price.');
  }
});

bot.onText(/\/market/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'This command is under development. Stay tuned!');
});

bot.onText(/\/top (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const limit = match[1];
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
    const coins = response.data;
    let message = `Top ${limit} cryptocurrencies by market capitalization:\n`;
    coins.forEach((coin, index) => {
      message += `${index + 1}. ${coin.symbol}: $${coin.current_price}\n`;
    });
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, 'Failed to fetch top cryptocurrencies.');
  }
});

bot.onText(/\/info (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const symbol = match[1];
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}`);
    const coinData = response.data;
    const message = `Information about ${coinData.name} (${coinData.symbol}):
Name: ${coinData.name}
Symbol: ${coinData.symbol}
Current Price: $${coinData.market_data.current_price.usd}
Market Cap Rank: ${coinData.market_cap_rank}
Total Supply: ${coinData.market_data.total_supply}`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, 'Failed to fetch cryptocurrency information.');
  }
});

bot.onText(/\/history (.+) (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const symbol = match[1];
  const days = match[2];
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=${days}`);
    const prices = response.data.prices;
    let message = `Historical price data for ${symbol} over the past ${days} days:\n`;
    prices.forEach((price) => {
      const date = new Date(price[0]).toDateString();
      const priceValue = price[1].toFixed(2);
      message += `${date}: $${priceValue}\n`;
    });
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, 'Failed to fetch cryptocurrency price history.');
  }
});

bot.onText(/\/recommend/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const coins = response.data;
    const randomIndex = Math.floor(Math.random() * coins.length);
    const coin = coins[randomIndex];
    const message = `I recommend checking out ${coin.name} (${coin.symbol})!`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, 'Failed to fetch cryptocurrency recommendation.');
  }
});

bot.onText(/\/news/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'This command is under development. Stay tuned!');
});
