const config = require('../../config.json')

module.exports = {
    name: "kick",
    description: "Kick a user",
    example: `kick <user>`,
    aliases: [
        "schop",
    ],
    args: true,
    owner: false,
    cooldown: 0 * 1000,

    async run (client, message, args, Discord){

        //REDO THIS LMAO

        if (message.member.permissions.has("KICK_MEMBERS")) {
            const member = message.mentions.users.first();
            args[1] ? reason = args.slice(1).join(' ') : reason = "None";

            if(member){
                if(member.id == client.user.id){
                
                    const cantKickSelf = new Discord.MessageEmbed()
                    .setDescription("You cannot kick the bot")
                    .setTimestamp()
                    .setFooter(config.name + '     ');
                    message.channel.send(cantKickSelf);
                    return;
    
                }else if(member.id == message.author.id){
    
                    const cantKickSelf = new Discord.MessageEmbed()
                    .setDescription("You cannot kick yourself")
                    .setTimestamp()
                    .setFooter(config.name + '     ');
                    message.channel.send(cantKickSelf);
                    return;
    
                }
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick({ days: 0, reason: reason }).catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because I am missing permissions.`));
                
                const hasBeenKicked = new Discord.MessageEmbed()
                .setTitle(`Kicked succesfull`)
                .addFields(
                    { name: 'User kicked:', value: member, inline: true},
                    { name: 'Reason:', value: reason, inline: false},
                    { name: 'Kicked by:', value: message.author, inline: true}                    
                )
                .setTimestamp()
                .setFooter(config.name + '     ');
                message.channel.send(hasBeenKicked);
                return; 
            
            }else {
                message.reply("Please include an @ of a member to kick");
            }
            } else {
            message.channel.send('You do not have the permission to use this command, please contact a server admin if you think this is incorrect.');
        }
    }
}