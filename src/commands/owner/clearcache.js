const config = require('../../config.json')
const mcApi = require('../../utils/api/mojang')
const hyApi = require('../../utils/api/hypixel')

module.exports = {
    name: "clearcache",
    description: "Clear all cache's of the bot",
    example: `clearcache`,
    aliases: [
        "cc"
    ],
    args: false,
    owner: true,
    cooldown: 0 * 1000,

    async run (client, message, args, Discord){
        mcApi.clearCache()
        hyApi.clearCache()

        const newEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setDescription(`Cleared Cache`)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(config.name);
        message.channel.send(newEmbed)
    }
}