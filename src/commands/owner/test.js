module.exports = {
    name: "test",
    description: "Testing complicated stuff",
    example: `arguments for testing`,
    aliases: [
        "test2",
        "test3"
    ],
    args: true,
    owner: true,
    cooldown: 0 * 1000,

    async run (client, message, args){
        if(args[0].toLowerCase() == "error"){
            throw new Error("manual error")
        }else{
            message.channel.send(`\`\`Testing\`\`: ${args}`)
        }
    }
}