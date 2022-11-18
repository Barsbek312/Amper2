import telebot
bot = telebot.TeleBot("1097635472:AAFR1gGCRh4A5gunrvutnkvWwZgC7nrlNgc")
@bot.message_handler(content_types=['text'])
def start(message):
    print(message)
bot.polling()