const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '878062841:AAGlZoqdZ970lAkvaxb44zYDH4h-RdheYlw';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    let chatId = msg.chat.id;
    let text = msg.text;
    if (text.length > 4){
        switch(text.substr(0,4)){
            case '/ba:':
                    bot.sendMessage(chatId, 'success ! go check your wallet!');
                break;
            default:
                break;
        }
    }else{
        // send a message to the chat acknowledging receipt of their message
        bot.sendMessage(chatId, 'hi there,what can i do for you\r\n\r\n/ba: + \'your tron address\' to get 1 ODIN!');
    }
});