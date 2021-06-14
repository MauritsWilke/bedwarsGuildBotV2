const config = require('../../config.json')
const utils = require('../../utils/utils')
const chalk = require('chalk');

module.exports = async (Discord, client, message) => {
	let args = message.content.slice(config.prefix.length).split(/ +/);
	const event = client.messageEvents.get(message.type);
	//EXECUTION
	try {
		event.run(client, message, args, Discord)
			.catch(err => {
				console.log(chalk`{red ! Event handler failed due to ${err}}`)?.then(m => m.delete({ timeout: config.deleteTime }).catch(e => { }))
			})
	} catch (err) {
		console.log(chalk`{red ! Event handler failed due to ${err}}`).then(m => m.delete({ timeout: config.deleteTime }).catch(e => { }))
	}
}