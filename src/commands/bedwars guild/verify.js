const config = require('../../config.json')
const hyApi = require('../../utils/api/hypixel')
const utils = require('../../utils/utils')

module.exports = {
    name: "verify",
    description: "Verify your Minecraft account in the Discord server",
    example: `verify <ign>`,
    aliases: [
        "v"
    ],
    args: true,
    owner: false,
    cooldown: 0 * 1000,
    canTakeIGN: false,

    async run (client, message, args, Discord){
        try{
            if(message.guild.id !== config.server.serverID){
                const wrongServer = new Discord.MessageEmbed()
                    .setColor(config.colours.error)
                    .setDescription(`This command is only accesible to the [Bedwars Guild Server](https://discord.gg/VmAQ6rpsHg)`)
                    .setThumbnail(config.images.error)
                    .setTimestamp()
                    .setFooter(config.name);
                return message.channel.send(wrongServer);
            }

            if(message.member.roles.cache.find(role => role.name === "verified")){
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(config.colours.error)
                    .setDescription(`You are already verified!`)
                    .setThumbnail(config.images.error)
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL());
                return message.channel.send(errorEmbed)
            }

            const player = await hyApi.playerStats(args[0]);

            if(!player?.socialMedia?.links?.DISCORD){
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(config.colours.error)
                    .setDescription(`You do not have your Discord linked on Hypixel`)
                    .setThumbnail(config.images.error)
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL());
                return message.channel.send(errorEmbed)
            }

            if(player?.socialMedia?.links?.DISCORD !== message.author.tag){
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(config.colours.error)
                    .setDescription(`The Discord user linked with your account is not the same as your own: ${player?.socialMedia?.links?.DISCORD}`)
                    .setThumbnail(config.images.error)
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL());
                return message.channel.send(errorEmbed)
            }
            try {
                let role = message.guild.roles.cache.find(role => role.name === "verified");
                message.member.roles.add(role.id);
                message.member.setNickname(player.displayname, "Adding @verified to user").catch(e=>{});

                const linkedEmbed = new Discord.MessageEmbed()
                    .setColor(config.colours.success)
                    .setDescription(`Successfully verified your Discord account with the user ${player.displayname}\nKeep in mind that nicking will unverify you`)
                    .setThumbnail(config.images.success)
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL());
                return message.channel.send(linkedEmbed)

            } catch(e) {
                message.channel.send("Something went wrong")
            }
        }catch(err) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(`Error: ${utils.betterText(err)} \nType ${config.prefix}help verify for more info`)
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name);
            return message.channel.send(errorEmbed);
        }
    }
}