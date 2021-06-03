const config = require('../../config.json')

module.exports = {
    name: "faq",
    description: "Frequently asked questions",
    example: `faq`,
    aliases: [
        "helpmepls",
        "frequentlyaskedquestions"
    ],
    args: false,
    owner: false,
    cooldown: 10 * 1000,

    async run (client, message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setTitle("Bedwars Guild | Faq")
            .setAuthor(config.name, client.user.displayAvatarURL())
            .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/836304445654171658/white-question-mark-emoji.png")
            .setDescription("The FAQ of the Bedwars Guild server, please read this before asking further questions\nA lot of info is also in #rules, please take the time to read it\n‏‏‎ ‎")
            .addFields(
                { name: '**How do I get verified?**', value: "\`\`Do !reqs IGN to check if you meet the requirements\nUnless you have an insanely high daily GEXP, these requirements cannot be discussed\`\`", inline: false},
                { name: '**What is an index score?**', value: "\`\`An index score is your (star × FKDR²)/10 \nDo !index to see in what ways you can increase your index score.\nAn FKDR below 1 has a bad impact on your index score.\`\`‎", inline: false},
                { name: '**How do I link my Discord account?**', value: "\`\`On Hypixel, go to a lobby, open your profile -> Social Media -> Discord\`\`‎", inline: false},
                { name: '**How do I get sweaty gamer rank?**', value: "\`\`This rank is given to people who have been in the guild for a while and have shown dedication to the guild and bedwars\n‏‏‎Please do not beg for this role as for it will only lower your chances of getting it\`\`‎", inline: false},
            )
            .setTimestamp()
            .setFooter(config.name);
        message.channel.send(newEmbed);
    }
}

