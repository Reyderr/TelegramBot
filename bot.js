const { Telegraf } = require('telegraf');
const {searchVideo} = require("./search");
const bot = new Telegraf(process.env.BOT_TOKEN)
const pgBase = require("./dataBase")

bot.start((ctx) => {
    ctx.reply('Привіт. Цей бот створений для полегшення пошуку відео по тегу для перегляду за їжею. Приємного перегляду ' + ctx.message.from.first_name)
    pgBase.addUser(ctx.message.from.first_name,ctx.message.from.id);
});

//bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help

bot.on('text', (ctx) => searchVideo(ctx.message.text,7, function(res){ ctx.reply(res);}))

bot.startPolling() // запуск бота


