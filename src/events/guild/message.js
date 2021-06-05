const config = require('../../config.json')
const utils = require('../../utils/utils')
const chalk = require('chalk')

const cooldowns = new Map();

module.exports = (Discord, client, message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || 
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return;
    if(command.owner && !config.owner.id.includes(message.author.id)) return message.channel.send(utils.ownerOnly()).then(m => m.delete({ timeout: 5000})).catch(e =>{});
    if(command.args && args.length == 0) return message.channel.send(utils.requiresArgs(command.example));
    
    console.log(chalk`{green > ${command.name} was used in ${message.guild.name} by ${message.author.tag}}`)
    
    // COOLDOWNS 
    if(!config.owner.id.includes(message.author.id)){
        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Discord.Collection())
        }
        const currentTime = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = command.cooldown;
        if(timestamps.has(message.author.id)){
            const expiration = timestamps.get(message.author.id) + cooldownAmount;
            
            if(currentTime < expiration){
                const timeleft = (expiration - currentTime) / 1000

                const cooldownEmbed = new Discord.MessageEmbed()
                    .setColor(config.colours.error)
                    .setDescription(`This command is currently on cooldown for \`\`${timeleft.toFixed(1)}\`\` more second(s).`)
                    .setThumbnail(config.images.error)
                    .setTimestamp()
                    .setFooter(config.name);
                return message.channel.send(cooldownEmbed).then(m=> m.delete({timeout:config.deleteTime}).catch(e=>{}))
            }
        }
        timestamps.set(message.author.id, currentTime);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    // EXECUTION
    try {
        command.run(client, message, args, Discord)
        .catch(err => {
            console.log(chalk`{red ! ${command.name} failed due to ${err}}`)?.then(m=> m.delete({timeout:config.deleteTime}).catch(e=>{}))
        })
    } catch (err){
        console.log(chalk`{red ! ${command.name} failed due to ${err}}`).then(m=> m.delete({timeout:config.deleteTime}).catch(e=>{}))
    }

}