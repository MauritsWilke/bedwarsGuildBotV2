const config = require('../../config.json')
const utils = require('../../utils/utils')

module.exports = {
    name: "botinfo",
    description: "Info about the bot",
    example: `botinfo`,
    aliases: [
        "bi",
        "info"
    ],
    args: false,
    owner: false,
    cooldown: 5 * 1000,

    async run (client, message, args, Discord){

        let totalSeconds = (client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const newEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setTitle(`${config.name} info`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Dev', value: `${utils.betterText(config.owner.name)}`, inline: true},
                { name: 'Ping', value: utils.betterText(`${client.ws.ping}ms`), inline: true},
                { name: 'Uptime', value: `${utils.betterText(`${hours}h ${minutes}m ${seconds}s`)}`, inline: true},

                { name: 'Servers', value: `${utils.betterText(client.guilds.cache.size)}`, inline: true},
                { name: 'Channels', value: `${utils.betterText(client.channels.cache.size)}`, inline: true},
                { name: 'Users', value: `${utils.betterText(client.users.cache.size)}`, inline: true},

                { name: 'Total Memory', value: utils.betterText(`${(process.memoryUsage().rss/ 1024 / 1024).toFixed(2)}mb`), inline: true},
                { name: 'Memory used', value: utils.betterText(`${(process.memoryUsage().heapUsed/ 1024 / 1024).toFixed(2)}mb`), inline: true},
                { name: 'Invite', value: `[Click here!](${config.invite})`, inline: true}
            )
            .setTimestamp()
            .setFooter(config.name);
        
        message.channel.send(newEmbed);
    }
}