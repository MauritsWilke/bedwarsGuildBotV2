require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
['commandHandler', 'eventHandler', 'process'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})
client.login(process.env.DISCORD_TOKEN);