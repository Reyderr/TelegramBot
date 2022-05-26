const { Telegraf } = require('telegraf');
const {searchVideo} = require("./search");
const bot = new Telegraf(process.env.BOT_TOKEN)
const pgBase = require("./dataBase")

bot.start((ctx) => {
    ctx.reply('Привіт. Цей бот створений для полегшення пошуку відео по тегу для перегляду за їжею. Приємного перегляду ' + ctx.message.from.first_name)
    pgBase.addUser(ctx.message.from.first_name,ctx.message.from.id);
});

bot.action('order', ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Change video order", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"Date",callback_data:'ord_date'},
                    {text:"Rating",callback_data:'ord_rat'},
                    {text:"Relevance",callback_data:'ord_rel'},
                    {text:"Title",callback_data:'ord_title'},
                    {text:"View Count",callback_data:'ord_count'}
                ],
                [
                    {text:"Back to menu",callback_data:'command'}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})

bot.action('duration', ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Change video duration", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"Any",callback_data:'dur_any'},
                    {text:"Long",callback_data:'dur_long'},
                    {text:"Medium",callback_data:'dur_medium'},
                    {text:"Short",callback_data:'dur_short'}
                ],
                [
                    {text:"Back to menu",callback_data:'command'}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})

bot.action('number_v', ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Change video duration", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"1",callback_data:'num_1'},
                    {text:"2",callback_data:'num_2'},
                    {text:"3",callback_data:'num_3'}
                ],
                [
                    {text:"Back to menu",callback_data:'command'}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})

bot.action('command', ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Change video settings", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"Order",callback_data:'order'},
                    {text:"Duration",callback_data:'duration'},
                    {text:"Number of videos",callback_data:'number_v'}
                ]
            ]
        }
    })
})

bot.command('command', ctx=>{
    bot.telegram.sendMessage(ctx.chat.id, "Change video settings", {
        reply_markup:{
            inline_keyboard: [
                [
                    {text:"Order",callback_data:'order'},
                    {text:"Duration",callback_data:'duration'},
                    {text:"Number of videos",callback_data:'number_v'}
                ]
            ]
        }
    })
})

// bot.command('help', ctx=>{
//     bot.telegram.sendMessage(ctx.chat.id, "Bot info", {
//         reply_markup:{
//             keyboard: [
//                 [
//                 {text:"test 1"},
//                 {text:"test 2"}
//                     ]
//             ],
//             resize_keyboard: true,
//             one_time_keyboard:true
//         }
//     })
// })


//bot.on('text', (ctx) => searchVideo(ctx.message.text,7, function(res){ ctx.reply(res);}))

bot.startPolling() // запуск бота


// bot.command("inline", (ctx) => {
//     ctx.reply("Hi there!", {
//         reply_markup: {
//             inline_keyboard: [
//                 /* Inline buttons. 2 side-by-side */
//                 [ { text: "Button 1", callback_data: "btn-1" }, { text: "Button 2", callback_data: "btn-2" } ],
//
//                 /* One button */
//                 [ { text: "Next", callback_data: "next" } ],
//
//                 /* Also, we can have URL buttons. */
//                 [ { text: "Open in browser", url: "telegraf.js.org" } ]
//             ]
//         }
//     });
// });

// bot.on('callback_query', (ctx) =>{
//     const command = ctx.update.callback_query.data;
//     switch (command) {
//         case 'order':
//             test('order');
//             break
//
//         case 'duration':
//             test('duration');
//             break
//     }
//
//     ctx.answerCbQuery();
//
// });
