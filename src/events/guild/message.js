const config = require('../../config.json')
const utils = require('../../utils/utils')
const chalk = require('chalk')

module.exports = (Discord, client, message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || 
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return;
    if(command.owner && message.author.id !== config.ownerID) return message.channel.send(utils.ownerOnly()).then(m => m.delete({ timeout: 5000})).catch(e =>{});
    if(command.args && args.length == 0) return message.channel.send(utils.requiresArgs(command.name, command.example));
    
    console.log(chalk`{green > ${command.name} was used in ${message.guild.name} by ${message.author.tag}}`)
    try {
        command.run(client, message, args, Discord)
        .catch(err => {
            console.log(chalk`{red ! ${command.name} failed due to ${err}}`)
        })
    } catch (err){
        console.log(chalk`{red ! ${command.name} failed due to ${err}}`)
    }

}