const { createCanvas, loadImage, registerFont } = require('canvas');
const config = require('../../config.json')
const canvas = createCanvas(595, 192);
const ctx = canvas.getContext('2d')
const leftPadding = 202;
const fontSize = 22;
const topPadding = 198 / 2;
const textPadding = fontSize + 15;

registerFont('src/templates/fonts/minecraft.ttf', { family: 'Sans Serif' })

module.exports = async (Discord, client, member) => {

    if(member.guild.id !== config.server.serverID) return;

    const guild = client.guilds.cache.get(config.server.serverID);
    const memberCount = addSuffix(guild.members.cache.size); 
    
    const welcomeCard = await loadImage('src/templates/images/welcomeCard.png');
    const profilePicture = await loadImage(member.user.displayAvatarURL({ format: 'png' }));
    
    const username = member.user.username.length > 17 ? `${member.user.username.slice(0, 15)}...` : member.user.username;

    ctx.fillStyle = '#FFFFFF';
    ctx.drawImage(welcomeCard, 0, 0, 595, 192);
    ctx.drawImage(profilePicture, 35, 32, 128, 128)
    ctx.font = `${fontSize}px Sans Serif`;
    ctx.fillText(`Welcome  ${username}`, leftPadding, topPadding);
    ctx.fillText(`You are our ${memberCount} member`, leftPadding, topPadding + textPadding);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png')
    client.channels.cache.get(config.server.channels.leave).send({ files: [attachment] })
    .catch(e => console.error(e))
}

function addSuffix(number){
    var suffix = ["th", "st", "nd", "rd"],
    value = number % 100;
    return number + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
}