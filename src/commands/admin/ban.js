const config = require('../../config.json')

module.exports = {
    name: "ban",
    description: "Ban users",
    example: `ban <user>`,
    aliases: [
        "cancel"
    ],
    args: true,
    owner: false,
    cooldown: 0 * 1000,
    canTakeIGN: false,

    async run (client, message, args, Discord){
       /* Each part of the embed can be deleted, press tab twice to edit the value */
       const banEmbed = new Discord.MessageEmbed()
         .setColor(config.colours.error)
         .setTitle(`Ban command will be added later`)
         .setDescription(`Just wait u impatient fuck`)
         .addFields(
           { name: `Ban`, value: `L`, inline: false }
         )
         .setTimestamp()    
         .setFooter(config.name, client.user.displayAvatarURL());
       return message.channel.send(banEmbed)
    }
}