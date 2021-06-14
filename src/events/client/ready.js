const config = require('../../config.json')
const chalk = require('chalk')
const packageLock = require("../../../package-lock.json");

module.exports = (Discord, client) => {

	client.user.setPresence({
		status: 'online',
		activity: {
			name: "!reqs",
			type: "LISTENING"
		}
	});

	const newEmbed = new Discord.MessageEmbed()
		.setColor(config.colours.default)
		.setTitle(config.name + " is online")
		.setThumbnail(client.user.displayAvatarURL())
		.addFields(
			{ name: 'Started at', value: `${Date().toString().slice(4, 24)}`, inline: true },
			{ name: 'Version', value: `${config.version}`, inline: true },
			{ name: 'Discord.js', value: `v${packageLock.packages['node_modules/discord.js'].version}`, inline: true },

			{ name: 'Description', value: config.description, inline: true },
			{ name: 'Prefix', value: config.prefix, inline: true },
			{ name: 'Ping', value: client.ws.ping, inline: true })
		.setTimestamp()
		.setFooter(config.name);

	(async () => {
		const user = await client.users.fetch(config.owner.id[0]);
		user.send(newEmbed);
	})()

	console.log(chalk`{cyanBright ╭───────────────────────────────────────────────────────────────────╮}`)
	console.log(chalk`{cyanBright │             ${config.name} is online running v${config.version}            │}`)
	console.log(chalk`{cyanBright │          https://github.com/MauritsWilke/bedwarsGuildBot          │}`)
	console.log(chalk`{cyanBright │                           Maurits Wilke                           │}`)
	console.log(chalk`{cyanBright ╰───────────────────────────────────────────────────────────────────╯}`)
}