const config = require('../../config.json')
const { } = require('../../utils/api/mojang')

module.exports = {
	name: "bedwars",
	description: "Get your overall bedwars stats",
	example: `bedwars <ign>`,
	aliases: [
		"bw"
	],
	args: true,
	owner: false,
	cooldown: 5 * 1000,
	canTakeIGN: true,

	async run(client, message, args, Discord) {

	}
}