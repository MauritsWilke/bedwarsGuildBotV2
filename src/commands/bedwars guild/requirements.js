const config = require('../../config.json')
const utils = require('../../utils/utils')
const colours = require('../../utils/json/starColours.json')
const hyApi = require('../../utils/api/hypixel')

module.exports = {
    name: "requirements",
    description: "Check if you meet the requirements to get verified in the guild!",
    example: `requirements <user>`,
    aliases: [
        "reqs",
        "req",
        "requirement"
    ],
    args: true,
    owner: false,
    cooldown: 5 * 1000,
    canTakeIGN: true,

    async run (client, message, args, Discord){
        try {
            const player = await hyApi.playerStats(args[0]);

            if(!player?.stats?.Bedwars){
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(`#FF5555`)
                    .setDescription(`${args[0]} has not played bedwars`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834415883454644244/exmark.png")
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL());
                return message.channel.send(errorEmbed)
            }

            let star = player.achievements.bedwars_level;
            let FKDR = player.stats.Bedwars.final_kills_bedwars / player.stats.Bedwars.final_deaths_bedwars;
            let index = (star * FKDR * FKDR)/10;
            let playerHead = `https://minotar.net/helm/${player.uuid}`
            let daysBetween = Math.floor((new Date() - new Date(player?.lastLogin))/(1000*60*60*24))
            let playerDiscord = (player?.socialMedia?.links?.DISCORD === undefined) ? "Not linked" : player?.socialMedia?.links?.DISCORD;
            
            client.users.cache.find(u => u?.tag === playerDiscord)?.id !== undefined ? meetsOne = ':white_check_mark:' : meetsOne = `:x:`;
            daysBetween <= 7 ? meetsTwo = ':white_check_mark:' : meetsTwo = `:x:`;
            index >= 30 ? meetsThree = ':white_check_mark:' : meetsThree = `:x:`;
            index > 30 && daysBetween <= 7 && client.users.cache.find(u => u?.tag === playerDiscord)?.id !== undefined ? colour = '#55FF55' : colour = '#FF5555';

            const newEmbed = new Discord.MessageEmbed()
                .setColor(colour)
                .setTitle('Requirement score of ' + player.displayname.replace(/_/g, '\\_'))
                .setThumbnail(playerHead)
                .addFields(
                    { name: 'In The Discord', value: `${meetsOne} ${utils.betterText(playerDiscord)}`, inline: false},
                    { name: 'Active at least once a week', value: `${meetsTwo}  ${utils.betterText(`Last login at ${new Date(player.lastLogin).toString().slice(4,15)}`)}`, inline: false},
                    { name: 'Index score of 30+ ', value: `${meetsThree} ${utils.betterText(utils.NaNtoZero(index.toFixed(2)))}`, inline: false},
                )
                .setTimestamp()
                .setFooter(config.name);
            message.channel.send(newEmbed);

        } catch(err) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(`Error: ${utils.betterText(err)} \nType ${config.prefix}help index for more info`)
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name);
            return message.channel.send(errorEmbed);
        }
        
    }
}