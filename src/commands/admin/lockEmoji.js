// const config = require('../../config.json')

// module.exports = {
//     name: "lockemoji",
//     description: "Limit an emoji to only certain roles",
//     example: `lockemoji`,
//     aliases: [
        
//     ],
//     args: false,
//     owner: false,
//     cooldown: 0 * 1000,

//     async run (client, message, args, Discord){
//         console.log(args[0])

//         let emoji = await message.guild.emojis.cache.find(emoji => emoji.name === firstEmoji)
//         const roleName = args.join(' ').slice(args[0].length + 1)
//         console.log(roleName)
//         let role = message.guild.roles.cache.find(r => r.name === roleName);
//         console.log(emoji.roles.add(role))

//     }
// }