const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Jimp = require('jimp');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jail')
    .setDescription('Send the user to jail')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to send to jail') // always add description because of the deployment
        .setRequired(false),
    ),
  async execute(interaction) {
    let overlay = await Jimp.read('src/templates/jail_bars.png');
    overlay.resize(1024, 1024);

    //avatar
    const user = interaction.options.getUser('user') || interaction.user;
    const avatarURL = user.displayAvatarURL({ extension: 'png', size: 1024 });

    const avatarJimp = await Jimp.read(avatarURL);

    avatarJimp.composite(overlay, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 0.5,
    });

    // Convert the modified image to a buffer
    const buffer = await avatarJimp.getBufferAsync(Jimp.MIME_PNG);

    // Create an attachment from the buffer
    const attachment = { files: [{ attachment: buffer, name: 'avatar.png' }] };

    // Update the embed to use the attachment
    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Avatar`)
      .setImage('avatar.png'); // Set the image as an attachment

    // Reply with the embed and the attachment
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
};
