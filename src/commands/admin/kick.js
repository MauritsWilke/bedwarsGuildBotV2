const config = require("../../config.json");

module.exports = {
    name: "kick",
    description: "Kick a user",
    example: `kick <user>`,
    aliases: ["schop"],
    args: true,
    owner: false,
    cooldown: 0 * 1000,
    canTakeIGN: false,

    async run(client, message, args, Discord) {
        const memberToKick = message.mentions.users.first();
        const reason = args[1] ? args.slice(1).join(" ") : "None";

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            const missingPermsEmbed = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(`You're missing permissions`)
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(missingPermsEmbed);
        }
        if (!memberToKick) {
            const provideUserEmbed = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(`Please provide a user to kick`)
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(provideUserEmbed);
        }
        if (memberToKick.id == client.user.id) {
            const cantKickBot = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(`You cannot kick the bot`)
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(cantKickBot);
        }
        if (memberToKick.id == message.author.id) {
            const cantKickSelf = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(`You cannot kick yourself`)
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(cantKickSelf);
        }
        const target = message.guild.members.cache.get(memberToKick.id);
        target.kick({ days: 0, reason: reason }).catch((error) => {
            const kickErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(
                    `Something went wrong trying to kick this user\nPlease make sure the bot has the permission to kick users\n**Err:** \`\`${error}\`\``
                )
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(kickErrorEmbed);
        });
        const targetKickedSuccesfully = new Discord.MessageEmbed()
            .setDescription(`Kicked succesfull`)
            .setColor(config.colours.success)
            .setThumbnail(config.images.success)
            .addFields(
                { name: "**User kicked**", value: memberToKick, inline: true },
                { name: "**Reason**", value: reason, inline: false },
                { name: "**Kicked by**", value: message.author, inline: true }
            )
            .setTimestamp()
            .setFooter(config.name, client.user.displayAvatarURL());
        return message.channel.send(targetKickedSuccesfully);
    },
};
