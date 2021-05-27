require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client()
client.commands = new Discord.Collection();
['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})
client.login(process.env.DISCORD_TOKEN);

// require('dotenv').config()
// const Discord = require('discord.js');
// const client = new Discord.Client()
// const config = require('./config.json')
// const fs = require('fs');
// const utils = require('../src/utils/utils');

// client.commands = new Discord.Collection();
// const Timeout = new Discord.Collection();

// const commandFolders = fs.readdirSync('./src/commands');
// for(const folder of commandFolders){
//     const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'))
//     for(const files of commandFiles){
//         const command = require(`./commands/${folder}/${files}`);
//         client.commands.set(command.name, command)
//     }
// }

// client.on("message", async (message) => {
//     if (!message.content.startsWith(config.prefix) || message.author.bot) return;

//     const args = message.content.slice(config.prefix.length).split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
//     if(!command) return;
//     if(command.owner && message.author.id !== config.ownerID) return message.channel.send(utils.ownerOnly()).then(m => m.delete({ timeout: 5000})).catch(e =>{});
//     if(command.args && args.length == 0) return message.channel.send(utils.requiresArgs(command.name, command.example));

//     command.run(client, message, args, Discord)
// })

// client.login(process.env.DISCORD_TOKEN);
// client.once("ready", () => {
//     console.log("Online")
// })