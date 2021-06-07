const config = require('../../config.json')

module.exports = {
    name: "suggestion",
    description: "Suggest features for the bot",
    example: `suggestion Add a feature that makes me server owner`,
    aliases: [
        "suggest",
        "dothis"
    ],
    args: true,
    owner: false,
    cooldown: 600 * 1000,
    canTakeIGN: false,

    async run (client, message, args, Discord){
        const user = await client.users.fetch(config.owner.id[0]);

        const firstArgs = message.content.split(/ +/);
        const suggestion = message.content.replace(firstArgs[0], "")

        const confirmed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setTitle(`Suggestion sent!`)
            .setThumbnail(message.author.avatarURL())
            .setDescription(`${suggestion}`)
            .setTimestamp()
            .setFooter(config.name);
        message.channel.send(confirmed)

        const newEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.success)
            .setTitle(`Suggestion from ${message.author.tag}`)
            .setThumbnail(message.author.avatarURL())
            .setDescription(`${suggestion}`)
            .setTimestamp()
            .setFooter(config.name);
        user.send(newEmbed);
    }
}