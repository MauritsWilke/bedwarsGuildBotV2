const config = require('../../config.json')
const { getUUID } = require('../../utils/api/mojang')
const { betterText } = require(`../../utils/utils`)
const fetch = require('node-fetch');

module.exports = {
    name: "uuid",
    description: "Get a player's uuid",
    example: `uuid <ign>`,
    aliases: [
        
    ],
    args: true,
    owner: false,
    cooldown: 10 * 1000,
    canTakeIGN: true,

    async run (client, message, args, Discord){
      try{
        const playerUUID = await getUUID(args[0])
      }catch(e){
          const errorEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(`Error: ${betterText(e)}\nType ${config.prefix}help uuid to see more info`)
            .setThumbnail(config.images.error)
            .setTimestamp()
            .setFooter(config.name, client.user.displayAvatarURL());
          return message.channel.send(errorEmbed);
      }

        const uuidEmbed = new Discord.MessageEmbed()
          .setColor(config.colours.default)
          .setTitle('UUID Converting')
          .addFields(
            { name: `**Username**`, value: `${betterText(args[0])}`, inline: false },
            { name: `**UUID**`, value: `${betterText(`${playerUUID}`)}`, inline: false }
          ) 
          .setThumbnail(`https://minotar.net/helm/${playerUUID}.png`)
          .setTimestamp()
          .setFooter(config.name, client.user.displayAvatarURL());
        return message.channel.send(uuidEmbed)
    }
}