const config = require('../../config.json')
const utils = require('../../utils/utils')

module.exports = {
    name: "help",
    description: "Teaches you the ways",
    example: `help <command>`,
    aliases: [
        "teachme",
        "howthisbotworks",
        "howbot"
    ],
    args: false,
    owner: false,
    cooldown: 1 * 1000,

    async run (client, message, args, Discord){
        if(!args[0]){
            return message.channel.send("Full command list is a work in progress");
        } else {
            if(!client.commands.has(args[0]) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))){
                const notARealCommand = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setTitle("That is not a real command!")
                .setDescription("Do !help to see a list of all available commands!")
                .setThumbnail(config.images.error)
                .setTimestamp()
                .setFooter(config.name);
                return message.channel.send(notARealCommand)
            }

            const commandData = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
            const helpEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setTitle(`Info about the command "${commandData.name}"`)
            .setThumbnail(config.images.success)
            .addFields(
                { name: '**Description**', value: `${utils.betterText(commandData.description)}`, inline: false},
                { name: '**Usage**', value: `${utils.betterText(config.prefix + commandData.example)}`, inline: false}
            )
            .setTimestamp()
            .setFooter(config.name);

            !commandData.aliases.length == 0 ? 
            helpEmbed.addField('**Aliases**', `${utils.betterText(commandData.aliases)}`, false) :
            null;

            return message.channel.send(helpEmbed)
        }
    }
}