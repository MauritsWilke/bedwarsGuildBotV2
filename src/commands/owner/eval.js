const config = require('../../config.json')

module.exports = {
	name: "eval",
	description: "Evaluate code",
	example: `eval <code>`,
	aliases: [
		"hack",
		"hackbot",
		"hax"
	],
	args: true,
	owner: true,
	cooldown: 0 * 1000,

	async run(client, message, args, Discord) {
		const flags = [...message.content.matchAll(/--\w+/g)];
		try {
			const code = args.join(" ").replace(/--\w+/g, '');

			let result = await eval(flags.flat().includes("--async") ? `(async () => {${code} })()` : code);

			if (flags.flat().includes("--silent")) return message.delete();

			if (typeof (result) == "object") result = JSON.stringify(result).replace(/{/g, "{\n  ").replace(/}/g, "\n}").replace(/,/g, ",\n  ");
			if (result?.length >= 1000) message.channel.send({ files: [new Discord.MessageAttachment(Buffer.from(result), 'result.js')] });

			let embed = new Discord.MessageEmbed()
				.setColor(config.colours.success)
				.setTimestamp()
				.setFooter(config.name, client.user.displayAvatarURL())
				.setTitle(`Eval ${result?.length >= 1000 ? `- Output too big, see file` : ""}`)
				.addField("Input:", `\`\`\`js\n${String(code).slice(0, 1006)}\n\`\`\``)
				.addField("Output:", `\`\`\`js\n${result?.length >= 1000 ? "See file" : String(result).slice(0, 1006)}\n\`\`\``);
			message.channel.send(embed)
		}
		catch (e) {
			if (flags.flat().includes("--silent")) return;
			let embed = new Discord.MessageEmbed()
				.setColor(config.colours.error)
				.setTimestamp()
				.setFooter(config.name, client.user.displayAvatarURL)
				.setTitle("Error ¯\\_(ツ)_/¯")
				.setDescription(String(e).slice(0, 1024))
			message.channel.send(embed)
		}
	}
}