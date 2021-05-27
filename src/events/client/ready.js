const config = require('../../config.json')
const chalk = require('chalk')

module.exports = () => {
    console.log(chalk`{cyanBright ╭───────────────────────────────────────────────────────────────────╮}`)
    console.log(chalk`{cyanBright │             ${config.name} is online running v${config.version}            │}`)
    console.log(chalk`{cyanBright │          https://github.com/MauritsWilke/bedwarsGuildBot          │}`)
    console.log(chalk`{cyanBright │                           Maurits Wilke                           │}`)
    console.log(chalk`{cyanBright ╰───────────────────────────────────────────────────────────────────╯}`)
}