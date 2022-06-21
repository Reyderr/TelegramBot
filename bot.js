const { Telegraf } = require('telegraf');
const {searchVideo} = require("./search");
const bot = new Telegraf(process.env.BOT_TOKEN)
const pgBase = require("./dataBase")

bot.start((ctx) => {
    ctx.reply('Привіт. Цей бот створений для полегшення пошуку відео по тегу для перегляду за їжею. Введіть /help для допомоги. Приємного перегляду ' + ctx.message.from.first_name)
    pgBase.addUser(ctx.message.from.first_name,ctx.message.from.id);


});

bot.action('order', ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Шукати за ", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"Датою",callback_data:'ord_date'},
                    {text:"Рейтингом",callback_data:'ord_rat'},
                    {text:"Актуальністю",callback_data:'ord_rel'},
                    {text:"Назвою",callback_data:'ord_title'},
                    {text:"Переглядами",callback_data:'ord_count'}
                ],
                [
                    {text:"До основного меню",callback_data:'command'}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})

bot.action('ord_date', ctx=>{
    pgBase.updateUserData(ctx.chat.id, 'date', null, null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('ord_rat', ctx=>{
    pgBase.updateUserData(ctx.chat.id, 'rate', null, null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('ord_rel', ctx=>{
    pgBase.updateUserData(ctx.chat.id, 'relevance', null, null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('ord_title', ctx=>{
    pgBase.updateUserData(ctx.chat.id, 'title', null, null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('ord_count', ctx=>{
    pgBase.updateUserData(ctx.chat.id, 'viewCount', null, null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('duration', ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Тривалість відео", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"Будь яка",callback_data:'dur_any'},
                    {text:"Довше 20хв",callback_data:'dur_long'},
                    {text:"4-20хв",callback_data:'dur_medium'},
                    {text:"До 4хв",callback_data:'dur_short'}
                ],
                [
                    {text:"До основного меню",callback_data:'command'}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})

bot.action('dur_any', ctx=>{
    pgBase.updateUserData(ctx.chat.id, null, 'any', null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('dur_long', ctx=>{
    pgBase.updateUserData(ctx.chat.id, null, 'long', null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('dur_medium', ctx=>{
    pgBase.updateUserData(ctx.chat.id, null, 'medium', null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('dur_short', ctx=>{
    pgBase.updateUserData(ctx.chat.id, null, 'short', null);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('number_v', ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Кількість відео для перегляду", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"1",callback_data:'num_1'},
                    {text:"2",callback_data:'num_2'},
                    {text:"3",callback_data:'num_3'}
                ],
                [
                    {text:"До основного меню",callback_data:'command'}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})

bot.action('num_1', ctx=>{
    pgBase.updateUserData(ctx.chat.id, null, null, 1);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('num_2', ctx=>{
    pgBase.updateUserData(ctx.chat.id, null, null, 2);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('num_3', ctx=>{
    pgBase.updateUserData(ctx.chat.id, null, null, 3);
    ctx.answerCbQuery();
    ctx.reply("Success update");
})

bot.action('command', ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Налаштування відео", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"Тип пошуку",callback_data:'order'},
                    {text:"Тривалість",callback_data:'duration'},
                    {text:"Кількість відео",callback_data:'number_v'}
                ]
            ]
        }
    })
})

bot.command('command', ctx=>{
    bot.telegram.sendMessage(ctx.chat.id, "Налаштування відео", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"Тип пошуку",callback_data:'order'},
                    {text:"Тривалість",callback_data:'duration'},
                    {text:"Кількість відео",callback_data:'number_v'}
                ]
            ]
        }
    })
})

bot.command('help', ctx=>{
    bot.telegram.sendMessage(ctx.chat.id, "Для пошуку відео введіть елемент назви чи тему відео і просто відішліть боту. Для зміни налаштувань пошуку використовуйте команду /command")
})

bot.on('text', (ctx) => pgBase.createLinks(ctx.chat.id, ctx.message.text, function (res){
    for (const link of res)
        ctx.reply(link);
}))

bot.startPolling()