process.stdin.resume();
const chalk = require('chalk')

const errorChar = "!";
const warningChar = ""

module.exports = () => {
    process.on('exit', (code) => {
        console.log(chalk`{bold.red ${errorChar} Client shutting down with code:}`, `${code}`);
    });
    process.on('uncaughtException', (err, origin) => {
        console.log(chalk`{bold.red ${errorChar} Error:}`, `${err}`);
        console.log(chalk`{bold.red ${errorChar} Origin:}`, `${origin}`);
    });
    process.on('warning', (warning) => {
        console.log(chalk`{magenta ${warningChar} Warning: }`, warning.message);
    })
}