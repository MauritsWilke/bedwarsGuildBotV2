process.stdin.resume();
const chalk = require('chalk')
const config = require(`../config.json`)

const errorChar = "!";
const warningChar = "⚠"

module.exports = (client, Discord) => {
	process.on('exit', (code) => {
		const newEmbed = new Discord.MessageEmbed()
			.setColor(config.colours.error)
			.setTitle("Unexpected Exit ❗")
			.setThumbnail(client.user.displayAvatarURL())
			.addField("\u200B", code)
			.setTimestamp()
			.setFooter(config.name);
		(async () => {
			const user = await client.users.fetch(config.owner.id[0]);
			user.send(newEmbed);
		})()
		console.log(chalk`{bold.red ${errorChar} Client shutting down with code:}`, `${code}`);
	});
	process.on('uncaughtException', (err, origin) => {
		const newEmbed = new Discord.MessageEmbed()
			.setColor(config.colours.error)
			.setTitle("Unsuspected Error ❗")
			.setThumbnail(client.user.displayAvatarURL())
			.addField(origin, err)
			.setTimestamp()
			.setFooter(config.name);
		(async () => {
			const user = await client.users.fetch(config.owner.id[0]);
			user.send(newEmbed);
		})()
		console.log(chalk`{bold.red ${errorChar} Error:}`, `${err}`);
		console.log(chalk`{bold.red ${errorChar} Origin:}`, `${origin}`);
	});
	process.on('warning', (warning) => {
		const newEmbed = new Discord.MessageEmbed()
			.setColor(config.colours.error)
			.setTitle("Warning ⚠")
			.setThumbnail(client.user.displayAvatarURL())
			.addField("\u200B", warning)
			.setTimestamp()
			.setFooter(config.name);
		(async () => {
			const user = await client.users.fetch(config.owner.id[0]);
			user.send(newEmbed);
		})()
		console.log(chalk`{magenta ${warningChar} Warning: }`, warning.message);
	})
}