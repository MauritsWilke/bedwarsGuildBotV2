const config = require('../../config.json')

module.exports = {
    name: "unverify",
    description: "unverify your account",
    example: `unverify`,
    aliases: [
        "unlink"
    ],
    args: false,
    owner: false,
    cooldown: 0 * 1000,
    canTakeIGN: true,

    async run (client, message, args, Discord){
        if(!message.member.roles.cache.find(role => role.name === "verified")){
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(`You aren't verified!`)
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(errorEmbed)
        }

        let role = message.guild.roles.cache.find(role => role.name === "verified");
        message.member.roles.remove(role.id);
        message.member.setNickname(message.author.username, "Unverifying user").catch(e=>{});

        const linkedEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.success)
            .setDescription(`Successfully unverified you!`)
            .setThumbnail(config.images.success)
            .setTimestamp()
            .setFooter(config.name, client.user.displayAvatarURL());
        return message.channel.send(linkedEmbed)

    }       
}