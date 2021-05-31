const config = require('../../config.json')

module.exports = {
    name: "changelog",
    description: "Check the changelog of the bot",
    example: `changelog`,
    aliases: [
        "update"
    ],
    args: false,
    owner: false,
    cooldown: 10 * 1000,

    async run (client, message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor(config.colours.default)
        .setTitle(`Changelog version ${config.version}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(config.name);
        
        let description = "";
        for(const changes in config.changelog){
            description += `${config.changelog[changes]}\n`
        }
        newEmbed.setDescription(description)

        message.channel.send(newEmbed);
    }
}