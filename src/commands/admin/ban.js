const config = require("../../config.json");

module.exports = {
    name: "ban",
    description: "Ban users",
    example: `ban <user>`,
    aliases: ["cancel"],
    args: true,
    owner: false,
    cooldown: 0 * 1000,
    canTakeIGN: false,

    async run(client, message, args, Discord) {

    },
};