const config = require('../../config.json')

const options = {
	year: 'numeric', month: 'numeric', day: 'numeric',
	hour: 'numeric', minute: 'numeric', second: 'numeric',
	hour12: false
}

module.exports = {
	name: "delete",
	description: "Mass delete messages",
	example: `delete 45`,
	aliases: [
		"nuke"
	],
	args: true,
	owner: false,
	cooldown: 0 * 1000,
	canTakeIGN: false,

	async run(client, message, args, Discord) {
		message.channel.bulkDelete(args[0])
			.then(messages => {
				let messageLog = "";
				const reverseMessages = [...messages].reverse()
				for (msg of reverseMessages) {
					const msgAttachments = msg[1].attachments
					const attachmentArray = msgAttachments.array()
					const timestamp = Intl.DateTimeFormat("en-GB", options).format(new Date(msg[1].createdTimestamp))
					const author = `${msg[1]?.author?.username}#${msg[1]?.author?.discriminator}`;
					const content = msg[1]?.content;
					const attachments = attachmentArray[0]?.attachment ? attachmentArray[0].attachment : false;

					messageLog += `${timestamp} | ${author}: ${content}	${attachments ? `\n + ${attachments}` : ""}\n\n`
				}
				const logChannel = message.guild.channels.cache.find(channel => channel.name == "logs") || null;
				if (logChannel) logChannel.send({ files: [new Discord.MessageAttachment(Buffer.from(messageLog), 'deleted.md')] });

				const deletedMessageSuccess = new Discord.MessageEmbed()
					.setColor(config.colours.success)
					.setDescription(`Succesfully deleted ${args[0]} messages`)
					.addFields(
						{ name: `Deleted by:`, value: `${message.author}`, inline: false }
					)
					.setThumbnail(config.images.success)
					.setTimestamp()
					.setFooter(config.name, client.user.displayAvatarURL());
				return message.channel.send(deletedMessageSuccess).then(m => m.delete({ timeout: config.deleteTime }).catch(e => { }))
			})
			.catch((error) => {
				const deletedMessageSuccess = new Discord.MessageEmbed()
					.setColor(config.colours.error)
					.setDescription(`An error occured when trying to delete ${args[0]} messages because of:\n${error}`)
					.setThumbnail(config.images.error)
					.setTimestamp()
					.setFooter(config.name, client.user.displayAvatarURL());
				return message.channel.send(deletedMessageSuccess).then(m => m.delete({ timeout: config.deleteTime }).catch(e => { }))
			});
	}
}