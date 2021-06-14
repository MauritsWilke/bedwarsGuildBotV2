const config = require('../../config.json')
const fs = require('fs');
const fileName = '../../config.json';
const file = require(fileName);


module.exports = {
	name: "setprefix",
	description: "Reset the prefix again to normal",
	example: `setprefix !`,
	aliases: [
		"sp"
	],
	args: true,
	owner: true,
	cooldown: 0 * 1000,
	canTakeIGN: false,

	async run(client, message, args, Discord) {
		file.prefix = args[0] || "!";
		fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
			if (err) return console.log(err);
			console.log('writing to ' + fileName);
			console.log(`Prefix now is ${config.prefix}`)
		});
	}
}