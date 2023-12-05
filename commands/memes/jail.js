const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Jimp = require('jimp');
const sharp = require('sharp');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jail')
    .setDescription('Send somebody to jail')
    .addUserOption(
      option =>
        option
          .setName('user')
          .setDescription('The user to show the avatar of')
          .setRequired(false), // Optional to choose a user
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const avatarURL = user.displayAvatarURL({ format: 'png', size: 1024 });
    const overlay = await Jimp.read('src/templates/jail_bars.png');

    overlay = overlay.resize(1024, 1024);

    const avatar = await Jimp.read(avatarURL);
    avatar.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
     if (err) throw new Error(err);
   
     // Convert WebP to PNG using sharp
     sharp(buffer)
       .toFormat('png')
       .toBuffer()
       .then(async (convertedBuffer) => {
         const avatarImage = await Jimp.read(convertedBuffer);
         avatarImage.composite(overlay, 0, 0, {
           mode: Jimp.BLEND_SOURCE_OVER,
           opacityDest: 1,
           opacitySource: 0.5,
         });
   
         const finalBuffer = await avatarImage.getBufferAsync(Jimp.MIME_PNG);
         const attachment = { files: [{ attachment: finalBuffer, name: 'jail.png' }] };
   
         const embed = new EmbedBuilder()
           .setTitle(`${user.username} is in jail!`)
           .setImage('attachment://jail.png');
   
         await interaction.reply({ embeds: [embed], files: [attachment] });
       })
  }),
}
}
