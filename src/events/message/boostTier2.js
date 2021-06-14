const { createCanvas, loadImage, registerFont } = require('canvas');
const config = require('../../config.json')
const utils = require('../../utils/utils')
const canvas = createCanvas(595, 192);
const ctx = canvas.getContext('2d');
const leftPadding = 195;
const fontSize = 18;
const topPadding = 198 / 2.5;
const textPadding = fontSize + 15;

registerFont('src/templates/fonts/minecraft.ttf', { family: 'Sans Serif' })

module.exports = {
	type: "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2",

	async run(client, message, args, Discord) {
		if (message.author.bot) return;

		const member = message.author;

		if (message.guild.id !== config.server.serverID) return;
		const guild = client.guilds.cache.get(config.server.serverID);
		const boostCount = guild.premiumSubscriptionCount;

		const boostCard = await loadImage('src/templates/images/tier3Boost.png');
		const profilePicture = await loadImage(member.displayAvatarURL({ format: 'png' }));

		const username = member.username.length > 17 ? `${member.username.slice(0, 18)}...` : member.username;

		ctx.fillStyle = '#FFFFFF';
		ctx.drawImage(boostCard, 0, 0, 595, 192);
		ctx.drawImage(profilePicture, 35, 32, 128, 128)
		ctx.font = `${fontSize}px Sans Serif`;
		ctx.fillText(`Thanks ${username} ${message.content ? "for" : ""}`, leftPadding, topPadding);
		ctx.fillText(`${message.content ? `` : "for "}boosting the server ${message.content ? `${message.content} times!` : ""}`, leftPadding, topPadding + textPadding)
		ctx.fillText(`This server now has ${boostCount} boosts!`, leftPadding, topPadding + textPadding * 2);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'boost.png')
		client.channels.cache.get(config.server.channels.boosting).send({ files: [attachment] })
			.catch(e => console.error(e))
	}
}