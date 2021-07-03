// This is really messy code and should NOT be used as an example for your own bot
// The code could be improved in many ways like a command handler, proper message handling and overall better and cleaner code
// I might do that in the future, but this is just a temp solution for a 24/7 host
require(`dotenv`).config()
const args = process.argv.splice(2);

const mineflayer = require(`mineflayer`);
const fetch = require(`node-fetch`)
const hyApi = require(`../utils/api/hypixel`)

const account = { username: args[0], password: args[1] }
const server = { host: args[2], port: args[3] ?? 25565 }

let chat = "/gc"

const bot = mineflayer.createBot({
	host: server.host,
	username: account.username,
	password: account.password,
	port: server.port
})

// _ Message logger
bot.on(`chat`, (username, message, translate, jsonMSG) => {
	const IGN = jsonMSG.extra[0].text.replace(/(§2Guild >|§3Officer >) §*7*(§*.\[.{3,9}\])*\s*/, "").replace(/ .*/, "")
	if (!jsonMSG.extra[0].text.startsWith(`§3Officer >`) && !jsonMSG.extra[0].text.startsWith(`§2Guild >`)) return

	const rank = jsonMSG.extra[0].text.replace(/(§2Guild >|§3Officer >) (§*.*\[.{3,9}\])* [^\s]* §*./, "").replace(/§.*/, "")
	const channel = jsonMSG.extra[0].text.startsWith(`§3Officer >`) ? "**Officer >**" : "**Guild >**";
	const msg = jsonMSG.extra[1].text

	const privateURL = new URL(process.env.PRIVATE_SERVER_WEBHOOK)
	const res = fetch(privateURL, {
		"method": "POST",
		"headers": { "Content-Type": "application/json" },
		"body": JSON.stringify({
			"username": `${rank} ${IGN}`,
			"content": `${channel} ${msg}`,
			"avatar_url": `https://minotar.net/avatar/${IGN}/128.png`,
			"allowed_mentions": {
				"everyone": false,
				"roles": false,
				"users": false
			}
		})

	}).catch(e => console.log(e))

	const publicURL = new URL(process.env.PUBLIC_SERVER_WEBHOOK)
	if (jsonMSG.extra[0].text.startsWith(`§2Guild >`)) {
		const res = fetch(publicURL, {
			"method": "POST",
			"headers": { "Content-Type": "application/json" },
			"body": JSON.stringify({
				"username": `${rank} ${IGN}`,
				"content": `${msg}`,
				"avatar_url": `https://minotar.net/avatar/${IGN}/128.png`,
				"allowed_mentions": {
					"everyone": false,
					"roles": false,
					"users": false
				}
			})
		}).catch(e => console.log(e))
	}
})

// _ Same message twice error
bot.on(`message`, (jsonMSG) => {
	if (jsonMSG.text != "You cannot say the same message twice!") return;
	bot.chat(`${chat} Error: cannot send the same message twice! [${Math.random().toString(36)}]`)
})

// _ Command Executor
bot.on(`chat`, async (username, message, translate, jsonMSG) => {
	if (username == bot.username) return
	if (!jsonMSG.extra[0].text.startsWith(`§3Officer >`) && !jsonMSG.extra[0].text.startsWith(`§2Guild >`)) return
	if (!jsonMSG.extra[1].text.startsWith(`!`)) return;

	chat = (`/${jsonMSG.extra[0].text.slice(2, 3)}c`).toLowerCase()
	const msg = jsonMSG.extra[1].text.slice(1)
	const args = msg.split(/ +/)
	const command = args[0].toLowerCase()

	try {
		if (command == "index") {
			const IGN = args[1] ?? jsonMSG.extra[0].text.replace(/§\d.* > §*(?<=.).\[.{3,9}\] /, "").replace(/ .*/, "")
			const player = await hyApi.playerStats(IGN);

			if (!player?.stats?.Bedwars) return bot.chat("This user has not played Bedwars")
			let star = player.achievements.bedwars_level;
			let FKDR = player.stats.Bedwars.final_kills_bedwars / player.stats.Bedwars.final_deaths_bedwars;
			let index = (star * FKDR * FKDR) / 10;

			bot.chat(`${chat} Index: [${+index.toFixed(2)}] | Star: [${star}] | FKDR: ${+FKDR.toFixed(2)}`)
		}

		if (command == "bw") {
			const IGN = args[1] ?? jsonMSG.extra[0].text.replace(/§\d.* > §*(?<=.).\[.{3,9}\] /, "").replace(/ .*/, "")
			const player = await hyApi.playerStats(IGN);

			if (!player?.stats?.Bedwars) return bot.chat("This user has not played Bedwars")
			let star = player.achievements.bedwars_level;
			let FKDR = (player.stats.Bedwars.final_kills_bedwars / player.stats.Bedwars.final_deaths_bedwars).toFixed(2);
			let WLR = (player.stats.Bedwars.wins_bedwars / (player.stats.Bedwars.games_played_bedwars - player.stats.Bedwars.wins_bedwars)).toFixed(2);
			let index = (star * FKDR * FKDR) / 10;

			bot.chat(`${chat} ${IGN}: Star: [${star}] | FKDR: [${NaNtoZero(FKDR)}] | WLR: [${NaNtoZero(WLR)}]`)
		}

		if (command == "ping") {
			bot.chat(`${chat} Current ping: [${bot.player.ping}ms]`)
		}
	} catch (e) {
		bot.chat(e)
	}
})

// _ Bot on 
bot.once(`spawn`, () => {
	bot.chat(`/chat g`)
	bot.chat(`/g join bedwars`)
	console.log(`Connected to ${bot._client.socket._host}. Ping: ${bot.player.ping}`)
})

// _ Error management
bot.on(`error`, err => console.log(err))
process.on(`uncaughtException`, (err) => { console.log(err) })

function NaNtoZero(s) {
	if (isNaN(s)) return '0';
	return `${s}`;
}

process.on(`message`, (message) => {
	bot.chat(message)
})
