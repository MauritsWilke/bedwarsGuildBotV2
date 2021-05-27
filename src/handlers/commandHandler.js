const fs = require('fs');
const { resolve } = require("path");

module.exports = (client, Discord) => {
    const commandFolders = fs.readdirSync('./src/commands');
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'))
        for (const files of commandFiles) {
            const command = require(resolve(`./src/commands/${folder}/${files}`));
            if (command.name) {
                client.commands.set(command.name, command)
            } else {
                continue;
            }
        }
    }
}