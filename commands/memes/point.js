const { SlashCommandBuilder } = require('discord.js');
const Jimp = require('jimp');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('point')
    .setDescription('Make a meme')
    .addStringOption(option =>
      option
        .setName('toptext')
        .setDescription('Enter the top text for the meme')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('bottomtext')
        .setDescription('Enter the bottom text for the meme')
        .setRequired(true),
    ),

  async execute(interaction) {
    const topText = interaction.options.getString('toptext');
    const bottomText = interaction.options.getString('bottomtext');

    const image = await Jimp.read('src/templates/rattew.jpg');

    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);

    // Define the Y positions for the top and bottom text
    const topTextPos = 10;
    const bottomTextPos = image.bitmap.height - 50;

    // Add the top text to the image
    image.print(
      font,
      0,
      topTextPos,
      {
        text: topText,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP,
      },
      image.bitmap.width,
    );

    // Add the bottom text to the image
    image.print(
      font,
      0,
      bottomTextPos,
      {
        text: bottomText,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
      },
      image.bitmap.width,
    );

    // Export the image to a buffer
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

    // Reply to the interaction with the image
    await interaction.reply({
      files: [{ attachment: buffer, name: 'meme.png' }],
    });
  },
};
