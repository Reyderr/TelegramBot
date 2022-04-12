const { Telegraf } = require('telegraf');
const {searchVideo} = require("./search");

const bot = new Telegraf("1060761585:AAG2irK2Gxl5qZrozZ8AZyhrTthRLqjWyoU")

bot.start((ctx) => ctx.reply('Привіт. Цей бот створений для полегшення пошуку відео по тегу для перегляду за їжею. Приємного перегляду ' + ctx.message.from.first_name));
bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help
bot.on('text', (ctx) => searchVideo(ctx.message.text,7, function(res){ ctx.reply(res);})) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
bot.startPolling() // запуск бота


