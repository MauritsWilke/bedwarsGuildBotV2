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
        const flags = [...message.content.matchAll(/--\w+/g)];
        try {
            const code = args.join(" ").replace(/--\w+/g, '');
            const evalCode = await Promise.resolve(eval(code)).then(result => {
                if(flags.flat().includes("--silent")) return message.delete();
                let embed = new Discord.MessageEmbed()
                    .setColor(config.colours.success)
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL())
                    .setTitle("Eval")
                    .addField("Input:", `\`\`\`js\n${String(code).slice(0, 1006)}\n\`\`\``)
                    .addField("Output:", `\`\`\`js\n${String(result).slice(0, 1006)}\n\`\`\``);
                message.channel.send(embed)
            })
        } catch (e) {
            if(flags.flat().includes("--silent")) return;
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