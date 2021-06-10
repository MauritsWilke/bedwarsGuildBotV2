const config = require('../../config.json')
const hyApi = require('../../utils/api/hypixel')
const utils = require('../../utils/utils')
const colours = require('../../utils/json/starColours.json')
const fetch = require('node-fetch')

module.exports = {
    name: "index",
    description: "Get your index score. \n (star × fkdr²)/10",
    example: `index <ign>`,
    aliases: [
        "threatindex",
        "inde"
    ],
    args: true,
    owner: false,
    cooldown: 3 * 1000,
    canTakeIGN: true,

    async run(client, message, args, Discord) {
        try {
            const player = await hyApi.playerStats(args[0]);

            if (!player?.stats?.Bedwars) {
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(`#FF5555`)
                    .setDescription(`${args[0]} has not played bedwars`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834415883454644244/exmark.png")
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL());
                return message.channel.send(errorEmbed)
            }


            let starNeeded = FKDRNeeded = '-';
            let star = player.achievements.bedwars_level;
            let FKDR = player.stats.Bedwars.final_kills_bedwars / player.stats.Bedwars.final_deaths_bedwars;
            let index = (star * FKDR * FKDR) / 10;
            let playerHead = `https://minotar.net/helm/${player.uuid}.png`
            if (index < 30) {
                starNeeded = ((30 * 10) / ((FKDR * FKDR))).toFixed(2);
                FKDRNeeded = (Math.sqrt((30 * 10) / star)).toFixed(2);
            }

            const indexEmbed = new Discord.MessageEmbed()
                .setColor(colours[Math.floor(star / 100)])
                .setTitle('Index Score of ' + player.displayname.replace(/_/g, '\\_'))
                .setThumbnail(playerHead)
                .addFields(
                    { name: 'Star', value: utils.betterText(star), inline: true },
                    { name: 'Needed', value: utils.betterText(starNeeded), inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'FKDR', value: utils.betterText(utils.NaNtoZero(FKDR.toFixed(2))), inline: true },
                    { name: 'Needed', value: utils.betterText(FKDRNeeded), inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Index', value: utils.betterText(utils.NaNtoZero(index.toFixed(2))), inline: false },
                )
                .setTimestamp()
                .setFooter(config.name);
            return message.channel.send(indexEmbed);

        } catch (err) {
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