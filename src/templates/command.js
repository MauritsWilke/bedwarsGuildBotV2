const config = require('../../config.json')

module.exports = {
    name: "",
    description: "",
    example: `${config.prefix}${this.name}`,
    aliases: [
        
    ],
    args: false,
    owner: false,
    cooldown: 0 * 1000,

    async run (client, message, args, Discord){
        
    }
}