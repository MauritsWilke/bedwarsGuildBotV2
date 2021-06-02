require('dotenv').config()
const fetch = require('node-fetch');
const Discord = require('discord.js')
const config = require('../config.json')
const chal = require('challonge');
const challonge = new chal.createClient({
    "apiKey": process.env.CHALLONGE_API_KEY
})

function ownerOnly() {
    const ownerEmbed = new Discord.MessageEmbed()
        .setColor(config.colours.default)
        .setDescription("This command is owner exclusive, sorry")
        .setTimestamp()
        .setFooter(config.name)
    return ownerEmbed;
}

function requiresArgs(example) {
    const argsEmbed = new Discord.MessageEmbed()
        .setColor(config.colours.default)
        .setTitle(`This command requires arguments`)
        .setDescription(`\`\`${config.prefix}${example}\`\``)
        .setTimestamp()
        .setFooter(config.name)
    return argsEmbed;
}

function betterText(text) {
    return `\`\`${text}\`\``
}

function NaNtoZero(s) {
    if (isNaN(s)) return '0';
    return `${s}`;
}

function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function ifNull(s) {
    if (s !== null) return `${s}`
    return 'None'
}

function toYN(s) {
    if (s == false) return 'No'
    return 'Yes'
}

module.exports = {
    ownerOnly,
    requiresArgs,
    betterText,
    NaNtoZero,
    capitalize,
    ifNull,
    toYN,
    challonge
}

