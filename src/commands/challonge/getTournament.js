const config = require('../../config.json')

module.exports = {
    name: "gettournament",
    description: "Retrieve information about a tournament",
    example: `gettournament <id>`,
    aliases: [
        
    ],
    args: true,
    owner: true,
    cooldown: 0 * 1000,
    canTakeIGN: false,

    async run (client, message, args, Discord){
        
    }
}