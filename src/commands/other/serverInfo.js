const config = require('../../config.json')
const utils = require('../../utils/utils')

module.exports = {
    name: "serverinfo",
    description: "Get data on the current server",
    example: `serverinfo`,
    aliases: [
        "si",
        "srvinfo"
    ],
    args: false,
    owner: false,
    cooldown: 5 * 1000,
    canTakeIGN: false,

    async run (client, message, args, Discord){
        let voiceChannelCount = message.guild.channels.cache.filter(c => c.type === 'voice').size;

        const newEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} | info`)
            .setThumbnail(message.guild.iconURL())
            .setColor(config.colours.default)
            .addFields(
                { name: 'Created At', value: message.guild.createdAt.toString().slice(4,24), inline: false},
                { name: 'Owner', value: message.guild.owner, inline: true},
                { name: 'Members', value: message.guild.memberCount, inline: true},

                { name: 'Region', value: utils.capitalize(message.guild.region.toString()), inline: true},
                { name: 'Text Channels', value: message.guild.channels.cache.size - voiceChannelCount, inline: true},
                { name: 'Voice Channels', value: voiceChannelCount, inline: true},
                { name: 'Rules', value: utils.ifNull(message.guild.rulesChannel), inline: true},

                { name: 'Boosts', value: message.guild.premiumSubscriptionCount, inline: true},
                { name: 'Verified', value: utils.toYN(message.guild.verified), inline: true},
                { name: 'Partnered', value: utils.toYN(message.guild.partnered), inline: true},
            )
            .setTimestamp()
            .setFooter(config.name);
        
        message.channel.send(newEmbed);
    }
}