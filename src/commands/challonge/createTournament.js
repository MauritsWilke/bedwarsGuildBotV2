const config = require('../../config.json');
const { challonge, toYN, betterText  } = require('../../utils/utils')

let messageCount = 0;
let abort = false;
let tournament = {
    name: "none",
    url: null,
    tournament_Type: "single elimination",
    open_signup: "false",
    signup_cap: 0,
    hold_third_place_match: false,
    description: ""
}
const questions = [
    "What should be the name of the tournament? (max 60 characters)",
    `Do you want a custom URL? Send \`\`'none'\`\` for a randomly generated URL. (letters, numbers, and underscores only)`,
    `What do you want the tournament type to be?\nSingle elimination, double elimination, round robin, swiss`,
    `Do you want to allow people to sign up trough the site? yes/no`,
    `Do you want a max amount of players? If so, send the amount in numbers`,
    `Do you want a special match for third place? yes/no`,
    `What do you want the description of the tournament to be?`
]
const tournamentKeys = Object.keys(tournament);
let embedFields = [];

module.exports = {
    name: "createtournament",
    description: "Create a tournament",
    example: `listTournaments <name> <url> <type> <open> <cap>`,
    aliases: [
        "ct"
    ],
    args: false,
    owner: true,
    cooldown: 0 * 1000,

    async run(client, message, args, Discord) {

        const tournamentEmbed = new Discord.MessageEmbed()
            .setColor(config.colours.default)
            .setTitle('Tournament Creator')
            .setDescription(questions[messageCount] + "\nSend \`\`STOP\`\` at any time to abort")
            .setThumbnail(config.images.challonge)
            .setTimestamp()
            .setFooter(config.name);


        message.channel.send(tournamentEmbed).then(m => {

            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30 * 1000 });
            collector.on('collect', message => {
                if (message.content.toLowerCase() == 'stop') {
                    abort = true;
                    collector.stop()
                    return;
                };
                
                let name = tournamentKeys[messageCount].charAt(0).toUpperCase() + tournamentKeys[messageCount].slice(1)
                embedFields.push({ name: name.replace(/_/g, ' '), value: betterText(message.content), inline: false });

                const edited = new Discord.MessageEmbed()
                    .setColor(config.colours.default)
                    .setTitle('Tournament Creator')
                    .setDescription(questions[messageCount] + "\nSend \`\`STOP\`\` at any time to abort")
                    .setThumbnail(config.images.challonge)
                    .addFields(embedFields)
                    .setTimestamp()
                    .setFooter(config.name);
                m.edit(edited).catch(e => { });

                tournament[messageCount] = message.content;
                messageCount++;
                if (messageCount == questions.length) return collector.stop()
                message.channel.send(questions[messageCount]);
                collector.resetTimer()
            });

            collector.on('end', collected => {
                if (abort){
                    const edited = new Discord.MessageEmbed()
                        .setColor(config.colours.default)
                        .setTitle('Tournament Creator')
                        .setDescription(`Cancelled tournament creation`)
                        .setThumbnail(config.images.challonge)
                        .setTimestamp()
                        .setFooter(config.name);
                    m.edit(edited).catch(e => {});
                };
                challonge.tournaments.create({
                    tournament: {
                        name: tournament[0],
                        url: tournament[1],
                        tournamentType: tournament[2].toLowerCase() || "single elimination",
                        open_signup: tournament[3].toLowerCase() == "yes" ? true : false,
                        signup_cap: tournament[4],
                        hold_third_place_match: tournament[5].toLowerCase() == "yes" ? true : false,
                        description: tournament[6]
                    },
                    callback: (err, data) => {
                        let embedDescription = "";
                        for(error in err.errors){
                            embedDescription += `\`\`${err.errors[error]}\`\`\n`
                        }
                        if(err){
                        const edited = new Discord.MessageEmbed()
                            .setColor(config.colours.error)
                            .setTitle('Tournament Creator')
                            .setDescription(`**Something went wrong:**\n${embedDescription}`)
                            .setThumbnail(config.images.challonge)
                            .setTimestamp()
                            .setFooter(config.name);
                        return m.edit(edited).catch(e => {});
                        }
                        const edited = new Discord.MessageEmbed()
                            .setColor(config.colours.success)
                            .setTitle('Tournament Creator')
                            .setDescription(`Succesfully created the tournament!`)
                            .addFields(
                                { name: "Name", value: betterText(data.tournament.name), inline: false},
                                { name: "URL", value: `[challonge.com/${data.tournament.url}](${data.tournament.fullChallongeUrl})`, inline: false},
                                { name: "Type", value: betterText(data.tournament.tournamentType), inline: false},
                                { name: "Open Signup", value: betterText(toYN(data.tournament.openSignup)), inline: false},
                                { name: "Signup Cap", value: betterText(data.tournament.signupCap), inline: false},
                                { name: "Third place match", value: betterText(toYN(data.tournament.holdThirdPlaceMatch)), inline: false},
                                { name: "Description", value: betterText(data.tournament.description), inline: false},
                                { name: "ID", value: `${betterText(data.tournament.id)}`, inline: false},
                            )
                            .setThumbnail(config.images.challonge)
                            .setTimestamp()
                            .setFooter(config.name);
                        m.edit(edited).catch(e => {});
                    }
                })
            })
        }).catch(e => {});
    }
}