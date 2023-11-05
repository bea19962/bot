const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('showpic')
    .setDescription("Retrieves the user's image")
    .addUserOption(
      option =>
        option
          .setName('user')
          .setDescription('The user to show the avatar of')
          .setRequired(false), //optional to choose an user
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Avatar`)
      .setImage(avatarURL);

    await interaction.reply({ embeds: [embed] });
  },
};
