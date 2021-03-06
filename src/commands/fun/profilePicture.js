const config = require('../../config.json');
const { createCanvas, loadImage } = require('canvas')
const mcApi = require('../../utils/api/mojang');

const canvas = createCanvas(320, 320);
const ctx = canvas.getContext("2d");
ctx.scale(16, 16)
ctx.imageSmoothingEnabled = false;

module.exports = {
	name: "profilepicture",
	description: "Generate one of those fancy profile pictures!\nwarning, results may vary",
	example: `profilepicture <ign> <hex1> <hex2> <shading> <backdrop>`,
	aliases: [
		"pfp"
	],
	args: true,
	owner: false,
	cooldown: 10 * 1000,
	canTakeIGN: true,

	async run(client, message, args, Discord) {
		try {
			// CUSTOM GRADIENT
			if (args[1] && args[2]) {
				if (!args[1].match(/^[#0-9A-F]+$/i) || !args[2].match(/^[#0-9A-F]+$/i)) {
					const errorEmbed = new Discord.MessageEmbed()
						.setColor(config.colours.error)
						.setDescription(`Invalid hex code!\nCheck [hex generator](https://www.color-hex.com/color-wheel/) to generate a valid hex`)
						.setThumbnail(config.images.error)
						.setTimestamp()
						.setFooter(config.name);
					return message.channel.send(errorEmbed);
				}

				let gradient = ctx.createLinearGradient(0, 20, 0, 0);
				const hex1 = args[1].slice(0, 1) == '#' ? args[1] : `#${args[1]}`
				const hex2 = args[2].slice(0, 1) == '#' ? args[2] : `#${args[2]}`
				gradient.addColorStop(1, hex2)
				gradient.addColorStop(0, hex1)
				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, 20, 20);
			}
			//DEFAULT BACKGROUND GRADIENT
			else {
				let gradient = ctx.createLinearGradient(0, 15, 0, 0);
				gradient.addColorStop(1, "#00cdac");
				gradient.addColorStop(0, "#02aab0");
				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, 20, 20);
			}

			//PLAYER SKIN CHECK?
			const templateImage = await loadImage(`src/templates/images/profilePicture/20x20template.png`);
			const skinURL = await mcApi.getSkin(args[0]);
			const playerSkin = await loadImage(skinURL);
			if (playerSkin.height == 32) {
				message.channel.send("Old skin support will be added later")
				return;
			}
			const shadingImage = await loadImage(`src/templates/images/profilePicture/20x20shading.png`);
			const purpleShadingImage = await loadImage(`src/templates/images/profilePicture/20x20pshading.png`);
			const backdropShading = await loadImage(`src/templates/images/profilePicture/backdropshading.png`)

			ctx.drawImage(templateImage, 0, 0, 20, 20);

			//BACKDROP SHADING
			args[4] == "false" ? null : ctx.drawImage(backdropShading, 0, 0, 20, 20);

			//BOTTOM LAYER
			ctx.drawImage(playerSkin, 8, 9, 7, 7, 8, 4, 7, 7); //Head (bottom layer)
			ctx.drawImage(playerSkin, 5, 9, 3, 7, 5, 4, 3, 7); //Head Side (bottom layer)
			ctx.drawImage(playerSkin, 36, 52, 3, 7, 12, 13, 3, 7); //Arm Right Side (bottom layer)
			ctx.drawImage(playerSkin, 21, 20, 6, 1, 7, 11, 6, 1); //Chest Neck Small Line (bottom layer)
			ctx.drawImage(playerSkin, 20, 21, 8, 8, 6, 12, 8, 8); //Chest Other (Bottom layer)
			ctx.drawImage(playerSkin, 44, 20, 3, 7, 5, 13, 3, 7); //Arm Left Side (bottom layer)

			//TOP LAYER
			ctx.drawImage(playerSkin, 40, 9, 7, 7, 8, 4, 7, 7); //Head (top layer)
			ctx.drawImage(playerSkin, 33, 9, 3, 7, 5, 4, 3, 7); //Head Side (top layer)
			ctx.drawImage(playerSkin, 52, 52, 3, 7, 12, 13, 3, 7); //Arm Right Side (top layer)
			ctx.drawImage(playerSkin, 52, 36, 3, 7, 5, 13, 3, 7); //Arm Left Side (bottom layer)
			ctx.drawImage(playerSkin, 20, 37, 8, 8, 6, 12, 8, 8); //Chest Other (top layer)
			ctx.drawImage(playerSkin, 21, 36, 6, 1, 7, 11, 6, 1); //Chest Neck Small Line (top layer)

			//ADDING SHADING
			args[3] == "false" ? null : ctx.drawImage(purpleShadingImage, 0, 0, 20, 20);

			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profilePicture.png')
			message.channel.send({ files: [attachment] })

		} catch (err) {
			const errorEmbed = new Discord.MessageEmbed()
				.setColor(config.colours.error)
				.setDescription(`Error: ${err}`)
				.setThumbnail(config.images.error)
				.setTimestamp()
				.setFooter(config.name);
			return message.channel.send(errorEmbed);
		}
	}
}