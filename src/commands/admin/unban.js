const config = require('../../config.json')

module.exports = {
	name: "unban",
	description: "Unban a banned user",
	example: `unban <userid>`,
	aliases: [
		"uncancel"
	],
	args: true,
	owner: false,
	cooldown: 0 * 1000,
	canTakeIGN: false,

	async run(client, message, args, Discord) {
		message.guild.members.unban(args[0])
			.then(user => {
				const targetBannedSuccesfully = new Discord.MessageEmbed()
					.setDescription(`Unbanned succesfull`)
					.setColor(config.colours.success)
					.setThumbnail(config.images.success)
					.addFields(
						{ name: "**User unbanned**", value: `<@${args[0]}>`, inline: true },
						{ name: "**User ID**", value: `${args[0]}`, inline: true },
						{ name: "**Unbanned by**", value: message.author, inline: false }
					)
					.setTimestamp()
					.setFooter(config.name, client.user.displayAvatarURL());
				return message.channel.send(targetBannedSuccesfully);
			})
			.catch((err) => {
				const kickErrorEmbed = new Discord.MessageEmbed()
					.setColor(config.colours.error)
					.setDescription(
						`Something went wrong trying to unban this user\nIf this keeps happening, please contact a server admin\n**Err:** \`\`${err}\`\``
					)
					.setThumbnail(config.images.error)
					.setTimestamp()
					.setFooter(config.name, client.user.displayAvatarURL());
				return message.channel.send(kickErrorEmbed);
			});
	}
}