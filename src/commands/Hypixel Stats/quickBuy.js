const config = require('../../config.json');
const hyApi = require('../../utils/api/hypixel');
const { betterText } = require('../../utils/utils')
const { createCanvas, loadImage, registerFont } = require('canvas');

const canvas = createCanvas(348, 259);
const ctx = canvas.getContext('2d');

module.exports = {
    name: "quickbuy",
    description: "Get your Hypixel Bedwars quickbuy!",
    example: `quickbuy <ign>`,
    aliases: [
        "qb"
    ],
    args: true,
    owner: false,
    cooldown: 30 * 1000,

    async run (client, message, args, Discord){
    try {
        const quickBuyBackground = await loadImage('src/templates/images/quickBuy/empty.png');
        ctx.drawImage(quickBuyBackground, 0, 0, canvas.width, canvas.height)

        const player = await hyApi.playerStats(args[0]);

        if(!player?.stats?.Bedwars?.favourites_2){
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(`#FF5555`)
                .setDescription(`${args[0]} has not played bedwars or has not logged in since quickbuy was added`)
                .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834415883454644244/exmark.png")
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(errorEmbed)
        }

        const quickBuy = player?.stats?.Bedwars?.favourites_2.split(',')
        for(let item in quickBuy){
            const itemImage = await loadImage(`src/templates/images/quickBuy/${quickBuy[item]}.png`).catch(e=>{})
            const leftCoord = 48 + (36 * item) - (Math.floor(item / 7) * (36*7));
            const topCoord = 104 + (Math.floor(item / 7) * 36);
            try{
                ctx.drawImage(itemImage, leftCoord, topCoord, 36, 36)
            }catch(e){console.log(quickBuy[item])}
        }

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'quickBuy.png')
        const quickBuyEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setDescription("To change these items, join a game of Bedwars and shift click an item to add it to your quick buy")
            .setTitle(`Quickbuy of ${player.displayname}`)
            .attachFiles(attachment)
            .setImage(`attachment://quickBuy.png`);

        message.channel.send(quickBuyEmbed)
        .catch(e => console.error(e))

    } catch(err) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(`Error: ${betterText(err)} \nType ${config.prefix}help quickbuy for more info`)
            .setThumbnail(config.images.error)
            .setTimestamp()
            .setFooter(config.name);
        return message.channel.send(errorEmbed);
    }
    }
}