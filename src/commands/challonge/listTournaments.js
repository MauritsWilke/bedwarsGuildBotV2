const config = require('../../config.json');
const { challonge } = require('../../utils/utils')

module.exports = {
    name: "listtournaments",
    description: "Get all current tournaments",
    example: `listTournaments`,
    aliases: [
        "tl"
    ],
    args: false,
    owner: true,
    cooldown: 5 * 1000,

    async run(client, message, args, Discord) {
        challonge.tournaments.index({
            callback: (err, data) => {
                const indexEmbed = new Discord.MessageEmbed()
                    .setColor(config.colours.default)
                    .setTitle(`Your tournaments`)
                    .setThumbnail(config.images.challonge)
                    .setTimestamp()
                    .setFooter(config.name);

                for (tournament in data) {
                    indexEmbed.addField(data[tournament].tournament.name, `[challonge.com/${data[tournament].tournament.url}](https://www.challonge.com/${data[tournament].tournament.url})`, true)
                }
                return message.channel.send(indexEmbed);
            }
        });
    }
}