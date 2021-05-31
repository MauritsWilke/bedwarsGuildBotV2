const config = require('../../config.json')
const chalk = require('chalk')

let rateLimitcount = 0;

module.exports = (Discord, client, member) => {
    rateLimitcount++;
    console.warn(chalk`{yellowBright ⚠ Warning, rate limit reached [${rateLimitcount}]}`)
}