const fs = require('fs');
const { resolve } = require("path");

module.exports = (client, Discord) => {
	client.messageEvents = new Discord.Collection();

	const eventFiles = fs.readdirSync(`./src/events/message`).filter(file => file.endsWith('.js'))
	for (const file of eventFiles) {
		const event = require(resolve(`./src/events/message/${file}`));
		if (event.type) {
			client.messageEvents.set(event.type, event)
		} else {
			continue;
		}
	}
}