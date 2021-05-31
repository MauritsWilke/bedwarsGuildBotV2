const config = require('../../config.json')

module.exports = {
    name: "manualindex",
    description: `Manually calculate your index score\n${config.prefix}manualindex star fkdr`,
    example: `manualindex 150 1.5`,
    aliases: [
        "mi",
        "manualthreatindex"
    ],
    args: true,
    owner: false,
    cooldown: 0 * 1000,

    async run (client, message, args, Discord){
        
        let indexScore = (args[0].replace(",",".") * args[1].replace(",",".") * args[1].replace(",","."))/10;
            
        const newEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setTitle('Manual Index Score')
            .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834086824309293097/math.png")
            .addFields(
                { name: 'Star', value: args[0].replace(",","."), inline: true},
                { name: 'FKDR', value: args[1].replace(",","."), inline: true},
                { name: 'Index score', value: indexScore.toFixed(2), inline: false},
            )
            .setTimestamp()
            .setFooter(config.name);
    
        message.channel.send(newEmbed);
    }
}