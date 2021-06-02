const config = require('../../config.json')

module.exports = {
    name: "eval",
    description: "Evaluate code",
    example: `eval <code>`,
    aliases: [
        "hack",
        "hackbot"
    ],
    args: true,
    owner: true,
    cooldown: 0 * 1000,

    async run (client, message, args, Discord){
        try {
            const code = args.join(" ");
            const evalCode = await Promise.resolve(eval(code)).then(code => {
        
                let embed = new Discord.MessageEmbed()
                    .setColor(config.colours.success)
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL())
                    .setTitle("Eval")
                    .addField("Input:", `\`\`\`js\n${String(args.join(" ")).slice(0, 1006)}\n\`\`\``)
                    .addField("Output:", `\`\`\`js\n${String(code).slice(0, 1006)}\n\`\`\``);
                message.channel.send(embed)
            })
        } catch (e) {
            let embed = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL)
                .setTitle("Error ¯\\_(ツ)_/¯")
                .setDescription(String(e).slice(0, 1024))
            message.channel.send(embed)
        }
    }
}