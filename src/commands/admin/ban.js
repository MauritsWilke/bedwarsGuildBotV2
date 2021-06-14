const config = require("../../config.json");

module.exports = {
	name: "ban",
	description: "Ban users",
	example: `ban <user>`,
	aliases: ["cancel"],
	args: true,
	owner: false,
	cooldown: 0 * 1000,
	canTakeIGN: false,

	async run(client, message, args, Discord) {
		const memberToBan = message.mentions.users.first();
		const daysToDelete = args[1] ? args[1] : 0;
		const reason = args[2] ? args.slice(2).join(" ") : "None";


		if (!message.member.permissions.has("BAN_MEMBERS")) {
			const missingPermsEmbed = new Discord.MessageEmbed()
				.setColor(config.colours.error)
				.setDescription(`You're missing permissions`)
				.setThumbnail(config.images.error)
				.setTimestamp()
				.setFooter(config.name, client.user.displayAvatarURL());
			return message.channel.send(missingPermsEmbed);
		}
		if (!memberToBan) {
			const provideUserEmbed = new Discord.MessageEmbed()
				.setColor(config.colours.error)
				.setDescription(`Please provide a user to kick`)
				.setThumbnail(config.images.error)
				.setTimestamp()
				.setFooter(config.name, client.user.displayAvatarURL());
			return message.channel.send(provideUserEmbed);
		}

		const target = message.guild.members.cache.get(memberToBan.id);
		if (!target.bannable) {
			const provideUserEmbed = new Discord.MessageEmbed()
				.setColor(config.colours.error)
				.setDescription(`I cannot ban that user`)
				.setThumbnail(config.images.error)
				.setTimestamp()
				.setFooter(config.name, client.user.displayAvatarURL());
			return message.channel.send(provideUserEmbed);
		}
		if (memberToBan.id == client.user.id) {
			const cantBanBot = new Discord.MessageEmbed()
				.setColor(config.colours.error)
				.setDescription(`You cannot ban the bot`)
				.setThumbnail(config.images.error)
				.setTimestamp()
				.setFooter(config.name, client.user.displayAvatarURL());
			return message.channel.send(cantBanBot);
		}
		if (memberToBan.id == message.author.id) {
			const cantBanSelf = new Discord.MessageEmbed()
				.setColor(config.colours.error)
				.setDescription(`You cannot ban yourself`)
				.setThumbnail(config.images.error)
				.setTimestamp()
				.setFooter(config.name, client.user.displayAvatarURL());
			return message.channel.send(cantBanSelf);
		}

		target.ban({ days: daysToDelete, reason: reason })
			.then(() => {
				const targetBannedSuccesfully = new Discord.MessageEmbed()
					.setDescription(`Banned succesfull`)
					.setColor(config.colours.success)
					.setThumbnail(config.images.success)
					.addFields(
						{ name: "**User banned**", value: `${memberToBan}`, inline: true },
						{ name: "**User ID**", value: `${memberToBan.id}`, inline: true },
						{ name: "**Reason**", value: reason, inline: false },
						{ name: "**Days Deleted**", value: daysToDelete, inline: false },
						{ name: "**Banned by**", value: message.author, inline: true }
					)
					.setTimestamp()
					.setFooter(config.name, client.user.displayAvatarURL());
				return message.channel.send(targetBannedSuccesfully);
			})
			.catch((error) => {
				const kickErrorEmbed = new Discord.MessageEmbed()
					.setColor(config.colours.error)
					.setDescription(
						`Something went wrong trying to ban this user\nPlease make sure the bot has the permission to ban users\n**Err:** \`\`${error}\`\``
					)
					.setThumbnail(config.images.error)
					.setTimestamp()
					.setFooter(config.name, client.user.displayAvatarURL());
				return message.channel.send(kickErrorEmbed);
			});
	},
}