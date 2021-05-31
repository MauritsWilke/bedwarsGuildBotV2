const { createCanvas, loadImage, registerFont } = require('canvas');
const config = require('../../config.json')
const canvas = createCanvas(595, 192);
const ctx = canvas.getContext('2d')
const leftPadding = 182;
const fontSize = 23;
const topPadding = 192 / 2.5;
const textPadding = fontSize + 15;

registerFont('src/templates/fonts/minecraft.ttf', { family: 'Sans Serif' })

module.exports = async (Discord, client, member) => {

    if(member.guild.id !== config.server.serverID) return;
 
    const welcomeCard = await loadImage('src/templates/images/welcomeCard.png');
    const profilePicture = await loadImage(member.user.displayAvatarURL({ format: 'png' }));
    
    const username = member.user.username.length > 25 ? `${member.user.username.slice(0, 23)}...` : member.user.username;

    ctx.fillStyle = '#FFFFFF';
    ctx.drawImage(welcomeCard, 0, 0, 595, 192);
    ctx.drawImage(profilePicture, 35, 32, 128, 128)
    ctx.font = `${fontSize}px Sans Serif`;
    ctx.fillText(`We're sorry to see you go,`, leftPadding, topPadding);
    ctx.fillText(`${username}`, leftPadding, topPadding + textPadding)
    ctx.fillText(`Hope to see you again soon!`, leftPadding, topPadding + textPadding * 2);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'farewell.png')
    client.channels.cache.get(config.server.channels.leave).send({ files: [attachment] })
    .catch(e => console.error(e))
}