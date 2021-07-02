const config = require('../../config.json')

module.exports = async (client, Discord) => {
	(function scheduleAgain() {
		let now = new Date();
		let millisTillDailyResets = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 25, 00, 0) - now;
		if (millisTillDailyResets < 0) {
			millisTillDailyResets += 86400000; //It has already been resetted, announce again tomorrow
		}
		setTimeout(function () {
			const announceLeaderboardResetting = new Discord.MessageEmbed()
				.setColor(config.colours.default)
				.setDescription(`Daily leaderboard is resetting in \`\`5\`\` minutes`)
				.setThumbnail(config.images.leaderboard)
				.setTimestamp()
				.setFooter(config.name, client.user.displayAvatarURL());

			client.channels.cache.get(config.server.channels.leaderboard).send(announceLeaderboardResetting)
			scheduleAgain();
		}, millisTillDailyResets)
	})()
}