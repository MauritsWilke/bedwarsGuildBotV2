const fetch = require('node-fetch');
const Discord = require('discord.js')
const config = require('../config.json')

function ownerOnly(){
    const ownerEmbed = new Discord.MessageEmbed()
    .setColor(config.colours.default)
    .setDescription("This command is owner exclusive, sorry")
    .setTimestamp()
    .setFooter(config.name)
    return ownerEmbed;
}

function requiresArgs(name, example){
    const argsEmbed = new Discord.MessageEmbed()
    .setColor(config.colours.default)
    .setTitle(`This command requires arguments`)
    .setDescription(`\`\`${config.prefix}${name}\`\` ${example}`)
    .setTimestamp()
    .setFooter(config.name)
    return argsEmbed;
}

function betterText(text){
    return `\`\`${text}\`\``
}

function NaNtoZero(s){
    if(isNaN(s)) return '0';
    return `${s}`;
}

module.exports = {
    ownerOnly,
    requiresArgs,
    betterText,
    NaNtoZero
}

