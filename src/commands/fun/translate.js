const config = require('../../config.json')

module.exports = {
    name: "translate",
    description: "translate text into Minecraft enchantment table language",
    example: `translate secret message for no one to read`,
    aliases: [
        "enchant"
    ],
    args: true,
    owner: false,
    cooldown: 2 * 1000,

    async run (client, message, args, Discord){
        let msg = args.join(' ');

        let translate_map={
            "a":"ᔑ",
            "b":"ʖ",
            "c":"ᓵ",
            "d":"↸",
            "e":"ᒷ",
            "f":"⎓",
            "g":"⊣",
            "h":"⍑",
            "i":"╎",
            "j":"⋮",
            "k":"ꖌ",
            "l":"ꖎ",
            "m":"ᒲ",
            "n":"リ",
            "o":"𝙹",
            "p":"!¡",
            "q":"ᑑ",
            "r":"∷",
            "s":"ᓭ",
            "t":"ℸ ̣ ",
            "u":"⚍",
            "v":"⍊",
            "w":"∴",
            "x":" ̇/",
            "y":"||",
            "z":"⨅",
            " ":" "
        }

        String.prototype.translate = function(){
            return this.replace(/[a-z]/g,
                function(a){
                    return translate_map[a]
                })
            };

        let embed = new Discord.MessageEmbed()
            .setColor('#AA00AA')
            .setTimestamp()
            .setFooter(config.name, client.user.displayAvatarURL)
            .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/838066476946685992/latest.png")
            .setTitle("Enchantment Table")
            .addField("**Enchanting**", `\`\`\`${msg}\`\`\``)
            .addField("**Enchanted**", `\`\`\`${msg.toLowerCase().translate()}\`\`\``);
        message.channel.send(embed)
    }
}