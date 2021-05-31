const config = require('../../config.json')
const utils = require('../../utils/utils')

module.exports = {
    name: "ping",
    description: "Ping status of the bot",
    example: `ping`,
    aliases: [
        "pong",
        "connection",
        "getinternet"
    ],
    args: false,
    owner: false,
    cooldown: 5 * 1000,

    async run (client, message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: '**Ping**', value: `${utils.betterText(`${client.ws.ping}ms`)}`, inline: false},
                { name: '**Roundtrip Latency**', value: `${utils.betterText("Pinging...")}`, inline: false}
            )
            .setTimestamp()
            .setFooter(config.name);
        message.channel.send(newEmbed).then(m => {
            const editedEmbed = new Discord.MessageEmbed()
                .setColor(config.colours.default)
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    { name: '**Ping**', value: `${utils.betterText(`${client.ws.ping}ms`)}`, inline: false},
                    { name: '**Roundtrip Latency**', value: `${utils.betterText(`${m.createdTimestamp - message.createdTimestamp}ms`)}`, inline: false}
                )
                .setTimestamp()
                .setFooter(config.name);
            m.edit(editedEmbed).catch(e =>{});
        });
    }
}